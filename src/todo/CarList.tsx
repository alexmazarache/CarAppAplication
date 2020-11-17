import React, { useContext , useState} from 'react';

import { RouteComponentProps } from 'react-router';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList, IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  useIonViewWillEnter,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Car from './Car';
import { getLogger } from '../core';
import { ItemContext } from './CarProvider';

const log = getLogger('ItemList');

const CarList: React.FC<RouteComponentProps> = ({ history }) => {
  const { items, fetching, fetchingError } = useContext(ItemContext);
  log('render');
  const [cars,setCars] = useState<string[]>([]);
  const [searchCar, setSearchCar] = useState<string>('');
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

  const res = items;
 
  async function searchNext($event:CustomEvent<void>){
    
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Car List</IonTitle>
          <IonSearchbar value={searchCar}
          debounce={1000}
          onIonChange={e => setSearchCar(e.detail.value!)}>
          </IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={fetching} message="Fetching items"/>
        {items && (
          <IonList>
            {items.filter(x=>x.text == searchCar).map(({ _id, text, title, date, edited, version }) =>
              <Car key={_id} _id={_id} text={text} title={title} date={date} edited={edited} version={version} onEdit={id => history.push(`/post/${id}`)}/>)
              }
             
          </IonList>
        )}
        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch items'}</div>
        )}
         <IonInfiniteScroll threshold="50px" disabled={disableInfiniteScroll}
                           onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
            loadingText="Loading more CARS...">
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/post')}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default CarList;
