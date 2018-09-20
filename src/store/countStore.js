import { observable, action, computed, runInAction, autorun, extendObservable } from 'mobx';
class CountStore {
   @observable num = 0;
   constructor(){
     
   }
   @computed get displayResult(){
        return this.num;
    }
}

export default CountStore;