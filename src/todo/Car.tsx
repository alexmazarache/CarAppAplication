import React from 'react';
import { IonCard, IonCardContent,  IonSearchbar, IonCardHeader, IonCardSubtitle, IonCardTitle, IonDatetime, IonItem, IonLabel, IonTitle, IonImg } from '@ionic/react';
import { CarProps } from './CarProps';

import {usePhotoGallery} from '../pages/usePhotoGallery';


interface PostPropsExt extends CarProps {
  onEdit: (_id?: string) => void;
}

const Car: React.FC<PostPropsExt> = ({ _id, text, title, version, edited, date,photoPath,latitude,longitude, onEdit }) => {
    let editedLabel;
    const {photos, takePhoto } = usePhotoGallery();
    console.log("Mofidied!!! ->" + edited);
    if(edited == true){
        editedLabel = <IonLabel> Version {version}, Edited</IonLabel>
    }else{
        editedLabel = <IonLabel> Version {version}, Original Post</IonLabel>
    }
  return (

    <IonItem onClick={() => onEdit(_id)}>
        <IonCard class='card-post'>
            <IonCardHeader>
                <IonCardTitle> {text}</IonCardTitle>
                <IonCardSubtitle>
                    <IonItem class='subtitle-card-post'>
                        <IonDatetime class='subtitle-card-post-date' value={date} display-timezone="utc" readonly={true} displayFormat="YYYY MMM DD, HH:mm"></IonDatetime>
                        {editedLabel}
                    </IonItem>
                    <IonItem>
                        <IonImg src ={photoPath}/>
                    </IonItem>
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
            {title}
            </IonCardContent>
        </IonCard>
    </IonItem>
  );
};

export default Car;
