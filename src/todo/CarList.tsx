import React, { useContext , useState, useEffect} from 'react';
import { createAnimation } from '@ionic/react';
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
  IonButton,
  IonModal
} from '@ionic/react';
import { add, fileTray,logOut,cloud,cloudOutline } from 'ionicons/icons';
import Car from './Car';
import { getLogger } from '../core';
import { ItemContext } from './CarProvider';
import { Redirect } from 'react-router-dom';
import { Login } from '../auth';
import { AuthContext } from '../auth';

import { useAppState } from '../pages/useAppState'
import { useNetwork } from '../pages/useNetwork';
const log = getLogger('ItemList');

const CarList: React.FC<RouteComponentProps> = ({ history }) => {
  
  useEffect(simpleAnimation,[]);

  const { appState } = useAppState();
  const { networkStatus } = useNetwork();

  const { items, fetching, fetchingError, getNext, disableInfiniteScroll } = useContext(ItemContext);
  log('render');
  
  
  const [cars,setCars] = useState<string>('');
  const [searchCar, setSearchCar] = useState<string>('');
  
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

  const [showModal, setShowModal] = useState(false);

  const enterAnimation = (baseEl: any) => {
    const backdropAnimation = createAnimation()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
        .addElement(baseEl.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' }
        ]);

    return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
  }
  const leaveAnimation = (baseEl: any) => {
    return enterAnimation(baseEl).direction('reverse');
  }

  mapping?.push('None');
  console.log("FILTRU:"+filter);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='square-a'>Car List </IonTitle>
        
          <IonSearchbar value={searchCar}
          debounce={1000}
          onIonChange={e => setSearchCar(e.detail.value!)}>
          </IonSearchbar>
          <IonLabel  className='square-b'> Selectare Marca</IonLabel>
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
     
      <IonModal isOpen={showModal} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
          <p>Modal</p>
          <IonButton onClick={() => setShowModal(false)}>Inchide</IonButton>
        </IonModal>
        <IonButton onClick={() => setShowModal(true)}>Modal</IonButton>


  
        <IonLoading isOpen={fetching} message="Fetching items"/>
        {
        
          items && (
        
          <IonList>
            
            {
              
                items
                .filter(car=> (car.text +" "+ car.title).indexOf(searchCar) >=0  && filter.match('None')  )
                .map(({ _id, text, title, date, edited, version,photoPath,latitude,longitude }) =>
                  <Car key={_id} _id={_id} text={text} title={title} date={date} edited={edited} version={version} photoPath={photoPath} latitude={latitude} longitude={longitude} onEdit={id => history.push(`/post/${id}`)}/>)
            }
            {  items
                .filter(car=> filter.match('None')==null  && car.text===filter && (car.text +" "+ car.title).indexOf(searchCar) >=0   )
                .map(({ _id, text, title, date, edited, version,photoPath,latitude,longitude }) =>
                <Car key={_id} _id={_id} text={text} title={title} date={date} edited={edited} version={version} photoPath={photoPath} latitude={latitude} longitude={longitude} onEdit={id => history.push(`/post/${id}`)}/>)
        
            }   
              
            
           
          </IonList>
          
        )}

        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch items'}</div>
        )}
        
        <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
                           onIonInfinite={(e: CustomEvent<void>) => getNext?.(e, items)}>
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
  function simpleAnimation() {
    const el = document.querySelector('.square-a');
    const el2=document.querySelector('.square-b');
    if (el && el2) {
      const animation = createAnimation()
          .addElement(el)
          .duration(2000)
          .iterations(2)
          .fromTo("transform","translateX(0px)","translateX(800px)")
          .fromTo("opacity",0.2,1);

      const animation2=createAnimation()
          .addElement(el2)
          .duration(1000)
          .direction('alternate')
          .iterations(5)
          .keyframes([
            { offset: 0, transform: 'scale(3)', opacity: '0.2' },
            {
              offset: 1, transform: 'scale(1.5)', opacity: '1'
            }
          ])
          .afterStyles({
            'background':'green'
          });
      (async () => {
        await animation.play();
        await animation2.play();
      })();

      }
  }
  
};

export default CarList;
