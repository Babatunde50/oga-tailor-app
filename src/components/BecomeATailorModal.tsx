import React, { useState, useRef, useContext } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import {
	IonHeader,
	IonContent,
	IonToolbar,
	IonButtons,
	IonButton,
	IonModal,
	IonIcon,
	IonTitle,
	IonList,
	IonCol,
	IonGrid,
	IonRow,
	IonItem,
	IonLabel,
	IonInput,
	IonText,
	IonAlert,
} from '@ionic/react';
import { close, camera } from 'ionicons/icons';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

import firebase, { storage, geofirestore } from '../firebase';
import { getCoordsForAddress } from '../utils/location';

import './BecomeATailorModal.css';
import { UserContext } from '../providers/UserProvider';

const { Camera } = Plugins;

interface inputs {
	name: string;
	street: string;
	number: number | null;
	country: string;
	city: string;
}

const BecomeATailorModal: React.FC<{ showModal: boolean; closeModal: () => void }> = ({ showModal, closeModal }) => {
	const user: { uid: string; name: string; email: string } | null = useContext(UserContext);
	const [takenPhoto, setTakenPhoto] = useState<{ path: undefined | File; preview: string }>({
		path: undefined,
		preview: '',
	});
	console.log(user, 'USer');
	const [telephone, setTelephone] = useState();
	const [inputValues, setInputValues] = useState<inputs>({ name: '', street: '', number: null, country: '', city: '' });
	const [errorMessage, setErrorMessage] = useState<string>('');
	const profileRef = storage.ref();
	const filePickerRef = useRef<HTMLInputElement>(null);
	const openFilePicker = () => {
		filePickerRef.current!.click();
	};

	const inputValuesHandler = (event: any) => {
		const { name, value } = event.target;
		setInputValues((inputValues) => ({ ...inputValues, [name]: value }));
	};

	const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target!.files![0];
		const fr = new FileReader();
		fr.onload = () => {
			console.log(fr.result!.toString());
			setTakenPhoto({
				path: file,
				preview: fr.result!.toString(),
			});
		};
		fr.readAsDataURL(file);
	};
	const takePhotoHandler = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			source: CameraSource.Camera,
			resultType: CameraResultType.Uri,
			width: 500,
		});
		if (!image || !image.webPath) return;
		console.log(image);
		setTakenPhoto({
			path: undefined,
			preview: image.webPath,
		});
	};
	const submitDataHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log(isValidPhoneNumber(telephone));
		if (!isValidPhoneNumber(telephone)) {
			setErrorMessage('Invalid mobile number');
			return;
		}
		if (!takenPhoto.preview) {
			setErrorMessage("Please upload your company's photo");
			return;
		}
		try {
			let file;
			if (!takenPhoto.path) {
				file = await fetch(takenPhoto.preview).then((r) => r.blob());
			} else {
				file = takenPhoto.path;
			}
			await profileRef.child(`tailors-logos/${user!.uid}`).put(file);
			const photoURL = await profileRef.child(`tailors-logos/${user!.uid}`).getDownloadURL();
			const { number, street, country, city, name } = inputValues;
			const coordinates = await getCoordsForAddress(`${number}, ${street}, ${city}, ${country}.`);

			await geofirestore
				.collection('users')
				.doc(user!.uid)
				.update({
					type: 'tailor',
					companyLogoURL: photoURL,
					telephone: telephone,
					companyName: name,
					companyAddress: {
						buildingNumber: number,
						street: street,
						country: country,
						city: city,
					},
					measurements: [],
					coordinates: new firebase.firestore.GeoPoint(coordinates.lat, coordinates.lng),
				});
		} catch (err) {
			setErrorMessage(err.message);
		}
	};
	return (
		<IonModal isOpen={showModal}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Become a Tailor</IonTitle>
					<IonButtons slot="end">
						<IonButton color="light" onClick={closeModal}>
							<IonIcon slot="icon-only" icon={close} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonAlert
					isOpen={!!errorMessage}
					onDidDismiss={() => setErrorMessage('')}
					header={'Error'}
					message={errorMessage}
					buttons={['OK']}
				/>
				<IonGrid>
					<form onSubmit={submitDataHandler}>
						<IonList>
							<IonItem>
								<IonLabel position="floating">Company's Name</IonLabel>
								<IonInput name="name" inputmode="text" required={true} onIonChange={inputValuesHandler} />
							</IonItem>
							<p style={{ paddingLeft: '1rem' }}> Company's Photo </p>
							<IonItem>
								<div className="image-container">
									<div className="image-preview">
										{!takenPhoto.preview && <h3>No photo chosen.</h3>}
										{takenPhoto.preview && <img src={takenPhoto.preview} alt="Preview" />}
									</div>
									<IonButton fill="outline" onClick={takePhotoHandler}>
										{takenPhoto.preview ? 'Retake Image' : 'Take Image'} <IonIcon icon={camera} />
									</IonButton>
									<IonText color="primary">
										<p onClick={openFilePicker}> upload Image instead ? </p>
										<input type="file" hidden ref={filePickerRef} onChange={pickFileHandler} />
									</IonText>
								</div>
							</IonItem>
							<IonItem>
								<IonLabel position="floating">Building Number</IonLabel>
								<IonInput
									name="number"
									inputmode="numeric"
									type="number"
									required={true}
									onIonChange={inputValuesHandler}
								/>
							</IonItem>
							<IonItem>
								<IonLabel position="floating">Street Name</IonLabel>
								<IonInput name="street" inputmode="text" required={true} onIonChange={inputValuesHandler} />
							</IonItem>
							<IonItem>
								<IonLabel position="floating">City</IonLabel>
								<IonInput name="city" inputMode="text" required={true} onIonChange={inputValuesHandler} />
							</IonItem>
							<IonItem>
								<IonLabel position="floating">Country</IonLabel>
								<IonInput name="country" inputMode="text" required={true} onIonChange={inputValuesHandler} />
							</IonItem>
						</IonList>
						<IonRow>
							<IonCol>
								<div style={{ padding: '1rem 0' }}>
									<PhoneInput
										defaultCountry="NG"
										placeholder="Enter phone number"
										value={telephone}
										onChange={setTelephone}
									/>
								</div>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<div style={{ padding: '1rem 0' }}>
									<IonButton expand="block" size="large" type="submit">
										Submit
									</IonButton>
								</div>
							</IonCol>
						</IonRow>
					</form>
				</IonGrid>
			</IonContent>
		</IonModal>
	);
};

export default BecomeATailorModal;
