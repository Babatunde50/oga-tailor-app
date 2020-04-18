import React, { useState } from 'react';
import {
	IonPage,
	IonHeader,
	IonContent,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonGrid,
	IonRow,
	IonCol,
	IonIcon,
	IonButton,
	IonSlides,
	IonSlide,
} from '@ionic/react';

import BecomeATailorModal from '../components/BecomeATailorModal';
import { man } from 'ionicons/icons';

const TailorSignUp: React.FC = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const slideOpts = {
		initialSlide: 1,
		speed: 400,
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton color="light" defaultHref="/profile" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="bg-tailor-signup">
					<div className="content">
						<h2>Grow your business</h2>
						<p style={{ fontWeight: 'bolder', lineHeight: '1.5rem' }}>
							Post your work and let people know your location,then you will start sewing than you ever imgained.
						</p>
						<IonButton color="primary" size="large" strong={true} expand="full" onClick={() => setShowModal(true)}>
							Become a Tailor
						</IonButton>
					</div>
				</div>
				<IonGrid>
					<IonRow>
						<h2>Discover your Potential</h2>
						<IonRow>
							<IonCol size="12">
								<p>
									{' '}
									<IonIcon icon={man} />{' '}
								</p>
								<p>Earn money </p>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero facere impedit dignissimos, vero
									iusto veniam velit dolorem omnis iste quasi perferendis fugiat nemo incidunt numquam, vel quia qui
									aspernatur recusandae!
								</p>
							</IonCol>
							<IonCol size="12">
								<p>
									{' '}
									<IonIcon icon={man} />{' '}
								</p>
								<p>Earn money </p>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero facere impedit dignissimos, vero
									iusto veniam velit dolorem omnis iste quasi perferendis fugiat nemo incidunt numquam, vel quia qui
									aspernatur recusandae!
								</p>
							</IonCol>
							<IonCol size="12">
								<p>
									{' '}
									<IonIcon icon={man} />{' '}
								</p>
								<p>Earn money </p>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero facere impedit dignissimos, vero
									iusto veniam velit dolorem omnis iste quasi perferendis fugiat nemo incidunt numquam, vel quia qui
									aspernatur recusandae!
								</p>
							</IonCol>
						</IonRow>
						<IonRow>
							<h2>Expand your reach</h2>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam placeat omnis consequatur ab cum
								possimus incidunt minus voluptatem odio! Quas enim quidem aliquid provident neque cum officia, deserunt
								illo sequi?
							</p>
						</IonRow>
					</IonRow>
				</IonGrid>
				<BecomeATailorModal showModal={showModal} closeModal={() => setShowModal(false)} />
				<IonSlides pager={true}>
					<IonSlide>
						<h1>Slide 1</h1>
					</IonSlide>
					<IonSlide>
						<h1>Slide 2</h1>
					</IonSlide>
					<IonSlide>
						<h1>Slide 3</h1>
					</IonSlide>
				</IonSlides>
			</IonContent>
		</IonPage>
	);
};

export default TailorSignUp;
