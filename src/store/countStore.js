import { observable, action, computed, runInAction, autorun, extendObservable } from 'mobx';
class CountStore {
   @observable num = 0;
   constructor(){
     
   }

   @action
   add(){
     this.num++;
   }
   @computed get displayResult(){
      // console.log(this.num)
        return this.num;
    }
}

export default CountStore;