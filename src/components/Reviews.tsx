import React from 'react';
import { IonRow, IonCol } from '@ionic/react';

const reviews = [
	{
		name: 'Tunde Ola',
		time: '2 weeks ago',
		image: '',
		review: 'This is a good course.',
		rating: 4,
	},
	{
		name: 'Tunde Ola',
		time: '2 weeks ago',
		image: '',
		review: 'This is a good course.',
		rating: 4,
	},
];

const Review: React.FC = () => {
	return (
		<>
			{reviews.map((review) => (
				<IonRow key={Math.random()}>
					<IonCol>
						<p> {review.rating} </p>
						<p> {review.review} </p>
						<p>
							{review.name} - {review.time}
						</p>
						<hr />
					</IonCol>
				</IonRow>
			))}
		</>
	);
};

export default Review;
