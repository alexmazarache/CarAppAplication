import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonDatetime, IonItem, IonLabel, IonTitle } from '@ionic/react';
import { CarProps } from './CarProps';

interface PostPropsExt extends CarProps {
  onEdit: (_id?: string) => void;
}

const Car: React.FC<PostPropsExt> = ({ _id, text, title, version, edited, date,  onEdit }) => {
    let editedLabel;
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
