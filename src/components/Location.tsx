import React from 'react'
import { IonRow, IonCol } from '@ionic/react';
// import { chatbubbleOutline, heartOutline, eyeOutline } from 'ionicons/icons';

import ENV from '../env';

const Location: React.FC<{ coords: {latitude: number, longitude: number} }> = ( { coords } ) => {
    let locationPreview = "";
    if(coords) {
        locationPreview = `https://maps.googleapis.com/maps/api/staticmap?center=${coords.latitude},${coords.longitude}&zoom=13&size=600x300&maptype=roadmap
        &markers=color:red%7Clabel:A%7C${coords.latitude},${coords.longitude}&key=${ENV.googleApiKey}`
    }
    return (
        <IonRow> 
            <IonCol>
                <img src={locationPreview && locationPreview} alt={coords.latitude.toString()} />
            </IonCol>
        </IonRow>
    )
}

export default Location;