import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
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
} from '@ionic/react';
import { close, camera } from 'ionicons/icons';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

import { storage } from '../firebase';

const { Camera } = Plugins;

const BecomeATailorModal: React.FC<{ showModal: boolean; closeModal: () => void }> = ({ showModal, closeModal }) => {
	const [takenPhoto, setTakenPhoto] = useState<{ path: string | undefined; preview: string }>({
		path: '',
		preview: '',
	});
	const [value, setValue] = useState();
	const profileRef = storage.ref().child('profile');
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
			path: image.path,
			preview: image.webPath,
		});
		console.log(takenPhoto);
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
				<IonGrid>
					<form>
						<IonList>
							<IonItem>
								<IonLabel position="floating">Company's Name</IonLabel>
								<IonInput inputmode="text" required={true} />
							</IonItem>
							<p style={{ paddingLeft: '1rem' }}> Company's Photo </p>
							<IonItem>
								<div>
									<IonButton onClick={takePhotoHandler}>
										Take Image <IonIcon icon={camera} />{' '}
									</IonButton>
									<IonText color="primary">
										<p> upload Image instead ? </p>
									</IonText>
								</div>
								{takenPhoto.preview && <img src={takenPhoto.preview} alt="Company" />}
							</IonItem>
							<IonItem>
								<IonLabel position="floating">Building Number</IonLabel>
								<IonInput />
							</IonItem>
							<IonItem>
								<IonLabel position="floating">Street Name</IonLabel>
								<IonInput inputmode="text" />
							</IonItem>
							<IonItem>
								<IonLabel position="floating">City</IonLabel>
								<IonInput />
							</IonItem>
							<IonItem>
								<IonLabel position="floating">Country</IonLabel>
								<IonInput />
							</IonItem>
						</IonList>
						<IonRow>
							<IonCol>
								<div style={{ padding: '1rem 0' }}>
									<PhoneInput defaultCountry="NG" placeholder="Enter phone number" value={value} onChange={setValue} />
								</div>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<div style={{ padding: '1rem 0' }}>
									<IonButton expand="block" size="large">
										Submit
									</IonButton>
								</div>
							</IonCol>
						</IonRow>
					</form>
					{/* <IonButton
						onClick={async () => {
							const blob = await fetch(takenPhoto.preview).then((r) => r.blob());
							profileRef
								.put(blob)
								.then(function (snapshot) {
									console.log('Uploaded a blob or file!');
									console.log(snapshot);
								})
								.catch((err: any) => {
									console.log(err);
								});
						}}
					>
						Upload Image
					</IonButton> */}
				</IonGrid>
			</IonContent>
		</IonModal>
	);
};

export default BecomeATailorModal;
