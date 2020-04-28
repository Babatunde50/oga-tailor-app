import React from 'react';
import {
	IonCol,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonIcon,
	IonCardContent,
	IonChip,
    IonLabel
} from '@ionic/react';
import { star, call, mail, helpCircleOutline } from 'ionicons/icons';

import './TailorCard.css';

const TailorCard: React.FC = (props: any) => {
    console.log(props.companyLogoURL)
	return (
		<IonCol size-md="6" offset-md="3">
			<IonCard>
				<img
					alt="tailor"
					src={props.companyLogoURL}
				/>
				<IonCardHeader>
					<IonCardTitle> {props.displayName} </IonCardTitle>
					<IonCardSubtitle>
						<IonIcon color="warning" icon={star} />
						<IonIcon color="warning" icon={star} />
						<IonIcon color="warning" icon={star} />
						<IonIcon color="warning" icon={star} />
					</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
                    <p className="distance"> 11 miles away </p>
					<IonChip>
						<IonLabel> Call </IonLabel>
						<IonIcon color="primary" icon={call} />
					</IonChip>
					<IonChip>
						<IonLabel> Mail </IonLabel>
						<IonIcon color="danger" icon={mail} />
					</IonChip>
					<IonChip>
						<IonLabel>More Info</IonLabel>
						<IonIcon color="warning" icon={helpCircleOutline} />
					</IonChip>
				</IonCardContent>
			</IonCard>
		</IonCol>
	);
};

export default TailorCard;
