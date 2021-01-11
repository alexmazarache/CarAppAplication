import React, { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonFabButton,
  IonIcon,
  IonFab
} from '@ionic/react';

import {usePhotoGallery} from "../pages/usePhotoGallery";
import { getLogger } from '../core';
import {camera} from "ionicons/icons";
import { ItemContext } from './CarProvider';
import { RouteComponentProps } from 'react-router';
import { CarProps } from './CarProps';
import { createAnimation } from '@ionic/react';
import {useMyLocation} from "../pages/useMyLocation";
import {MyMap} from "../components/MyMap";

const log = getLogger('ItemEdit');

interface ItemEditProps extends RouteComponentProps<{
  id?: string;
}> {}

const CarEdit: React.FC<ItemEditProps> = ({ history, match }) => {
  const { items, saving, savingError, saveItem } = useContext(ItemContext);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [item, setItem] = useState<CarProps>();

  const {photos, takePhoto } = usePhotoGallery();
  const myLocation=useMyLocation();
  const [latitude,setLatitude]=useState(46.74171953333042);
  const [longitude,setLongitude]=useState( 23.58319291105199
    );
  const [photoPath,setPhotoPath]=useState("");
  const { latitude: lat, longitude: lng } = myLocation.position?.coords || {}
  useEffect(groupeAnimation,[]);
  useEffect(simpleAnimation,[]);
  useEffect(() => {
    //debugger;
    log('useEffect');
    const routeId = match.params.id || '';
    const item = items?.find(it => it._id === routeId);
    setItem(item);
    if (item) {
      setText(item.text);
      setTitle(item.title);
      setPhotoPath(item.photoPath);
      if(item.latitude)setLatitude(item.latitude);
      if(item.longitude)setLongitude(item.longitude);
    }
  }, [match.params.id, items]);
  const handleSave = () => {
    let editedItem = undefined;
    if(item){
      editedItem = item;
      editedItem.text = text;
      editedItem.title = title;
      editedItem.latitude = latitude;
      editedItem.longitude = longitude;
      editedItem.photoPath = photoPath;
    }else{
      editedItem = {
        text: text,
        title: title,
        version: 1,
        edited: false,
        date: "",
        photoPath: "",
        latitude: latitude,
        longitude:longitude
      }
    }
    saveItem && saveItem(editedItem).then(() => history.goBack());
  };

  const setMapPosition = (e: any) => {
    setLatitude(e.latLng.lat());
    setLongitude(e.latLng.lng());
  }


  log('render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div >My Location is</div>
      <div>latitude: {latitude}</div>
      <div>longitude: {longitude}</div>
      
      <IonContent>
      <MyMap
          lat={latitude}
          lng={longitude}
          onMapClick={setMapPosition}
          onMarkerClick={log('onMarker')} 
      />
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton className="square-a"  onClick={() => {
            const photoTaken = takePhoto();
            photoTaken.then((da) => {
              setPhotoPath(da.webviewPath!);
            });
          }}>
            
            <IonIcon   icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        
        <IonLabel className="label-a">Marca</IonLabel>
        <IonInput value={text} onIonChange={e => setText(e.detail.value || '')} />
        <IonLabel className="label-b">Model</IonLabel>
        <IonInput value={title} onIonChange={e => setTitle(e.detail.value || '')} />
        
        <IonImg src={photoPath}/>

        <IonLoading isOpen={saving} />
        {savingError && (
          <div>{savingError.message || 'Failed to save item'}</div>
        )}
      </IonContent>
    </IonPage>
  );
  function groupeAnimation() {
    const el1 = document.querySelector('.label-a');
    const el2 = document.querySelector('.label-b');
    if (el1 && el2 ) {
      const animation1 = createAnimation()
          .addElement(el1)
          .direction('alternate')
          .iterations(5)
          .keyframes([
            { offset: 0, transform: 'scale(3)', opacity: '0.5' },
            {
              offset: 1, transform: 'scale(1.5)', opacity: '1'
            }])
          .afterStyles({
            'background': 'blue'
          });
      const animation2 = createAnimation()
          .addElement(el2)
          .direction('alternate')
          .iterations(5)
          .keyframes([
            { offset: 0, transform: 'scale(3)', opacity: '0.5' },
            {
              offset: 1, transform: 'scale(1.5)', opacity: '1'
            }])
          .afterStyles({
            'background': 'blue'
          });
      
      const parentAnimation = createAnimation()
          .duration(1000)
          .addAnimation([animation1, animation2]);
      parentAnimation.play();

    }
  }
  function simpleAnimation() {
    const el = document.querySelector('.square-a');
    if (el) {
      const animation = createAnimation()
          .addElement(el)
          .duration(1000)
          .direction('alternate')
          .iterations(5)
          .keyframes([
            { offset: 0, transform: 'scale(2)', opacity: '0.5' },
            {
              offset: 1, transform: 'scale(1)', opacity: '1'
            }
          ]);
      animation.play();
    }
  }
};

//function log(source: string) {
 // return (e: any) => console.log(source, e.latLng.lat(), e.latLng.lng());
//}


export default CarEdit;
