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
	IonCard,
	IonCardContent,
	IonAvatar,
} from '@ionic/react';

import BecomeATailorModal from '../components/BecomeATailorModal';
import { shareSocialOutline, peopleOutline, thumbsUpOutline } from 'ionicons/icons';
import './TailorSignUp.css';

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
						<p>Post your work and let people know your location,then you will start sewing than you ever imgained.</p>
						<IonButton color="primary" size="large" strong={true} expand="full" onClick={() => setShowModal(true)}>
							Become a Tailor
						</IonButton>
					</div>
				</div>
				<IonGrid className="main-content">
					<IonRow>
						<IonCol>
							<h2 className="section-title">Discover your Potential</h2>
						</IonCol>
						<IonCol size="12">
							<h1>
								{' '}
								<IonIcon size="large" icon={shareSocialOutline} />{' '}
							</h1>
							<h4> Share your works </h4>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero facere impedit dignissimos, vero iusto
								veniam velit dolorem omnis iste quasi perferendis fugiat nemo incidunt numquam, vel quia qui aspernatur
								recusandae!
							</p>
						</IonCol>
						<IonCol size="12">
							<h1>
								{' '}
								<IonIcon size="large" icon={peopleOutline} />{' '}
							</h1>
							<h4> Increase your customers </h4>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero facere impedit dignissimos, vero iusto
								veniam velit dolorem omnis iste quasi perferendis fugiat nemo incidunt numquam, vel quia qui aspernatur
								recusandae!
							</p>
						</IonCol>
						<IonCol size="12">
							<h1>
								{' '}
								<IonIcon size="large" icon={thumbsUpOutline} />{' '}
							</h1>
							<h4> Get reviews </h4>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero facere impedit dignissimos, vero iusto
								veniam velit dolorem omnis iste quasi perferendis fugiat nemo incidunt numquam, vel quia qui aspernatur
								recusandae!
							</p>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="12">
							<h2 className="section-title">Expand your reach</h2>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam placeat omnis consequatur ab cum
								possimus incidunt minus voluptatem odio! Quas enim quidem aliquid provident neque cum officia, deserunt
								illo sequi?
							</p>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonSlides pager={true} options={slideOpts}>
							<IonSlide>
								<IonCard>
									<IonCardContent>
										<p style={{ textAlign: 'left' }}>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quaerat libero a itaque?
											Provident quia tenetur vitae magnam, nisi earum sed quos, beatae suscipit quidem perspiciatis
											ducimus optio impedit facere.
										</p>
										<IonRow>
											<IonCol size="5">
												<IonAvatar className="img-tailor">
													<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="testimony" />
												</IonAvatar>
											</IonCol>
											<IonCol>
												<h3 style={{ fontWeight: 'bolder', textAlign: 'left' }}>Tunde Ola</h3>
												<p style={{ textAlign: 'left' }}>A professional tailor</p>
											</IonCol>
										</IonRow>
									</IonCardContent>
								</IonCard>
							</IonSlide>
							<IonSlide>
								<IonCard>
									<IonCardContent>
										<p style={{ textAlign: 'left' }}>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quaerat libero a itaque?
											Provident quia tenetur vitae magnam, nisi earum sed quos, beatae suscipit quidem perspiciatis
											ducimus optio impedit facere.
										</p>
										<IonRow>
											<IonCol size="5">
												<IonAvatar className="img-tailor">
													<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="testimony" />
												</IonAvatar>
											</IonCol>
											<IonCol>
												<h3 style={{ fontWeight: 'bolder', textAlign: 'left' }}>Tunde Ola</h3>
												<p style={{ textAlign: 'left' }}>A professional tailor</p>
											</IonCol>
										</IonRow>
									</IonCardContent>
								</IonCard>
							</IonSlide>
							<IonSlide>
								<IonCard>
									<IonCardContent>
										<p style={{ textAlign: 'left', marginBottom: '1rem' }}>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quaerat libero a itaque?
											Provident quia tenetur vitae magnam, nisi earum sed quos, beatae suscipit quidem perspiciatis
											ducimus optio impedit facere.
										</p>
										<IonRow>
											<IonCol size="5">
												<IonAvatar className="img-tailor">
													<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="testimony" />
												</IonAvatar>
											</IonCol>
											<IonCol>
												<h3 style={{ fontWeight: 'bolder', textAlign: 'left' }}>Tunde Ola</h3>
												<p style={{ textAlign: 'left' }}>A professional tailor</p>
											</IonCol>
										</IonRow>
									</IonCardContent>
								</IonCard>
							</IonSlide>
						</IonSlides>
					</IonRow>
					<IonRow>
						<IonCol>
							<h1>Become our tailor today</h1>
							<p>Join the world's largest online tailor community</p>
							<IonButton color="primary" size="large" strong={true} expand="full" onClick={() => setShowModal(true)}>
								Get Started
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
				<BecomeATailorModal showModal={showModal} closeModal={() => setShowModal(false)} />
			</IonContent>
		</IonPage>
	);
};

export default TailorSignUp;
