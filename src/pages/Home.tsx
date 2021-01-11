import {IonContent,IonRow,IonCol,IonImg, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar,IonGrid} from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {camera} from "ionicons/icons";

import {usePhotoGallery} from "./usePhotoGallery";

const Home: React.FC = () => {
    const { photos,takePhoto } = usePhotoGallery();
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
          <IonGrid>
              <IonRow>
                  {photos.map((photo, index) => (
                      <IonCol size="6" key={index}>
                          <IonImg src={photo.webviewPath}/>
                      </IonCol>
                  ))}
              </IonRow>
          </IonGrid>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => takePhoto()}>
                  <IonIcon icon={camera}></IonIcon>
              </IonFabButton>
          </IonFab>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*<ExploreContainer />*/}
      </IonContent>
    </IonPage>
  );
};

export default Home;
