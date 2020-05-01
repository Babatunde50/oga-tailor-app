import React, { useState, useEffect, useRef } from 'react';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
	IonSearchbar,
	IonIcon,
	IonFab,
	IonFabButton,
	IonSpinner,
	IonAlert,
	IonModal,
	IonButton,
	IonButtons,
} from '@ionic/react';
import { close, arrowForwardCircle } from 'ionicons/icons';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import './NewPostModal.css';

const NewPostModal: React.FC<{ showModal: boolean; closeModal: () => void }> = ({ showModal, closeModal }) => {
	const filePickerRef = useRef<HTMLInputElement>(null);
	const cropperRef = useRef<Cropper>(null);
	const [preview, setPreview] = useState('');
    const [croppedImaage, setCroppedImage] = useState('');
    const [showStory, setShowStory] = useState(false);
	const openFilePicker = () => {
		filePickerRef.current!.click();
	};
	
	const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target!.files![0];
		if (!file.type.match(/^image\//)) {
			return;
		}
		const fr = new FileReader();
		fr.onload = () => {
			console.log(fr.result!.toString());
			setPreview(fr.result!.toString());
		};
		fr.readAsDataURL(file);
    };
	const crop = () => {
		const croppedImage = cropperRef!.current!.getCroppedCanvas().toDataURL();
		setCroppedImage(croppedImage);
	};
	return (
		<IonModal isOpen={showModal}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Add a New Design</IonTitle>
					<IonButtons slot="end">
						<IonButton color="light" onClick={closeModal}>
							<IonIcon slot="icon-only" icon={close} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					{!preview && !showStory && (
						<IonRow className="post-start-container">
							<IonCol>
								<h1>Share Your Work</h1>
								<p>Start by taking a photo of your latest design</p>
								<IonButton onClick={openFilePicker}> Select a Photo </IonButton>
								<input type="file" hidden ref={filePickerRef} onChange={pickFileHandler} />
							</IonCol>
						</IonRow>
					)}
					{!!preview && !showStory && (
						<IonRow>
							<IonCol>
								<Cropper
									ref={cropperRef}
									src={preview}
									style={{ height: '80vh', width: '100vw' }}
									guides={false}
									crop={crop}
									wheelZoomRatio={0.5}
								/>
								<IonButton expand="block" fill="outline" onClick={() => {setShowStory(true)}} >
									Next <IonIcon slot="end" icon={arrowForwardCircle} />{' '}
								</IonButton>
							</IonCol>
						</IonRow>
					)}
                    {
                        showStory && (
                            <IonRow>
                                <IonCol>
                                    <p>To be continues!!</p>
                                </IonCol>
                            </IonRow>
                        )
                    }
				</IonGrid>
			</IonContent>
		</IonModal>
	);
};

export default NewPostModal;
