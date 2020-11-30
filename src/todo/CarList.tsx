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
  IonSelect,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSelectOption,
  IonLabel,
  IonButton
} from '@ionic/react';
import { add, fileTray,logOut } from 'ionicons/icons';
import Car from './Car';
import { getLogger } from '../core';
import { ItemContext } from './CarProvider';
import { Redirect } from 'react-router-dom';
import { Login } from '../auth';
import { AuthContext } from '../auth';

const log = getLogger('ItemList');

const CarList: React.FC<RouteComponentProps> = ({ history }) => {
  
  
    const { items, fetching, fetchingError } = useContext(ItemContext);
    log('render');
  
  
  const [cars,setCars] = useState<string>('');
  const [searchCar, setSearchCar] = useState<string>('');
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
   console.log("handleLogout");
    logout?.();
  }
 

  async function searchNext($event:CustomEvent<void>){
    
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }
  const [filter,setFilter] = useState<string>('None');

  const mapping = items?.map(car=>car.text)
  .filter((value,index,category)=>category.indexOf(value)===index);

  
  mapping?.push('None');
  console.log("FILTRU:"+filter);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Car List</IonTitle>
          <IonSearchbar value={searchCar}
          debounce={1000}
          onIonChange={e => setSearchCar(e.detail.value!)}>
          </IonSearchbar>
          <IonLabel> Selectare Marca</IonLabel>
          <IonSelect value= {filter} placeholder = "Selectati Marca" onIonChange={e=>setFilter(e.detail.value)}>
        {
         mapping?.map(item=>
          <IonSelectOption key={item} value ={item} >{item} </IonSelectOption>
          
          )

        }

      </IonSelect>
        </IonToolbar>
      </IonHeader>
      <IonContent>
     
      
      
  
        <IonLoading isOpen={fetching} message="Fetching items"/>
        {
        
          items && (
        
          <IonList>
            
            {
              
                items
                .filter(car=> (car.text +" "+ car.title).indexOf(searchCar) >=0  && filter.match('None')  )
                .map(({ _id, text, title, date, edited, version }) =>
                  <Car key={_id} _id={_id} text={text} title={title} date={date} edited={edited} version={version} onEdit={id => history.push(`/post/${id}`)}/>)
            }
            {  items
                .filter(car=> filter.match('None')==null  && car.text===filter && (car.text +" "+ car.title).indexOf(searchCar) >=0   )
                .map(({ _id, text, title, date, edited, version }) =>
                  <Car key={_id} _id={_id} text={text} title={title} date={date} edited={edited} version={version} onEdit={id => history.push(`/post/${id}`)}/>)
            
            }   
              
            
           
          </IonList>
          
        )}

        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch items'}</div>
        )}
        
         <IonInfiniteScroll threshold="10px" disabled={disableInfiniteScroll}
                           onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
            loadingText="Loading more CARS...">
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/post')}>
            <IonIcon icon={add}/>
          </IonFabButton>
        <IonFabButton onClick={handleLogout}>
            <IonIcon icon = {logOut}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default CarList;
