import { Injectable } from "@angular/core";

export class FsmObject {
    type: string;
    public dirty = true;
}

// States
export class FsmStateData {
    x: number;
    y: number;
    label: string;
    start = false;
    final = false;
}

export class FsmState extends FsmObject {
    private _data: FsmStateData;
    get position() { return { x: this._data.x, y: this._data.y }; }
    get label() { return this._data.label; }
    get start() { return this._data.start; }
    get final() { return this._data.final; }
    set position(val) {
        if (this._data.x !== val.x || this._data.y !== val.y) { this.dirty = true; }
        this._data.x = val.x;
        this._data.y = val.y;
    }
    set label(val) {
        if (this._data.label !== val) { this.dirty = true; }
        this._data.label = val;
    }
    set start(val) {
        if (this._data.start !== val) { this.dirty = true; }
        this._data.start = val;
    }
    set final(val) {
        if (this._data.final !== val) { this.dirty = true; }
        this._data.final = val;
    }

    constructor(stateData: FsmStateData) {
        super();
        this.fromSerializableObject(stateData);
    }

    toSerializableObject(): FsmStateData {
        return this._data;
    }
    fromSerializableObject(obj: FsmStateData) {
        this._data = obj;
        this.type = 'state';
    }
}

// Transitions
export class FsmTransitionData {
    charactersAccepted = 'a';
    rotation = 0.0;
    startState = '';
    endState = '';
}
export class FsmTransition extends FsmObject {
    private _data: FsmTransitionData;
    private _startState: FsmState = null;
    private _endState: FsmState = null;
    get startState(): FsmState { return this._startState; }
    get endState(): FsmState { return this._endState; }
    get charactersAccepted(): string { return this._data.charactersAccepted; }
    get rotation(): number { return this._data.rotation; }
    set startState(val: FsmState) {
        this._startState = val;
        this._data.startState = (val ? val.label : '');
    }
    set endState(val: FsmState) {
        this._endState = val;
        this._data.endState = (val ? val.label : '');
    }
    set charactersAccepted(val) {
        if (this._data.charactersAccepted !== val) { this.dirty = true; }
        this._data.charactersAccepted = val;
    }
    set rotation(val) {
        if (this._data.rotation !== val) { this.dirty = true; }
        this._data.rotation = val;
    }

    constructor(transData: FsmTransitionData, startState: FsmState, endState: FsmState) {
        super();
        this.fromSerializableObject(transData, startState, endState);
    }

    toSerializableObject(): FsmTransitionData {
        return this._data;
    }
    fromSerializableObject(obj: FsmTransitionData, startState: FsmState, endState: FsmState) {
        this._data = obj;
        this.type = 'transition';
        this.startState = startState;
        this.endState = endState;
    }
}

@Injectable()
export class Fsm {
    states: FsmState[] = []; // [new FsmState({ x: 50, y: 50, label: 'q0', start: false, final: false })];
    transitions: FsmTransition[] = [];
    alphabet: string[] = [];
    private dfa = false;
    private _dirty = false;

    get dirty(): boolean {
        let isdirty = this._dirty;
        this.states.forEach(state => isdirty = isdirty || state.dirty);
        this.transitions.forEach(trans => isdirty = isdirty || trans.dirty);
        return isdirty;
    }
    set dirty(val: boolean) {
        this.states.forEach(state => state.dirty = val);
        this.transitions.forEach(trans => trans.dirty = val);
        this._dirty = val;
    }

    serialize(): string {
        const states = this.states.map(item => item.toSerializableObject());
        const transitions = this.transitions.map(item => item.toSerializableObject());
        return JSON.stringify({ states: states, transitions: transitions });
    }
    deserialize(data: string) {
        const object = JSON.parse(data);
        this.states = object.states.map(item => new FsmState(item));
        this.transitions = object.transitions.map(trans => {
            const start = this.states.find(state => state.label === trans.startState);
            const end = this.states.find(state => state.label === trans.endState);
            return new FsmTransition(trans, start, end);
        });

    }
    // will go through ever transition to see if there are nondeterministic characteristics
    checkDfa(){
        // trans will be the outer loop, i.e. the tranisition currently being compared to all others
        this.transitions.forEach(trans => {
            // trans2 will be the inner loop, i.e. the transition currently being compared to trans
            this.transitions.forEach(trans2 => {
                // if they start from the same state
                if(trans.startState === trans2.startState){
                    // if they do not share the same end state
                    if(trans.endState !== trans2.endState) {
                        // for-loops to compare characters accepted
                        // outer loop will go through characters accepted for trans
                        for(let i = 0; i < trans.charactersAccepted.length; i++){
                            // inner loop will go through characters accepted by trans2
                            for(let j = 0; j < trans2.charactersAccepted.length; j++){
                                // if they share a character then FSM is not a dfa
                                if(trans.charactersAccepted.charAt(i) === trans2.charactersAccepted.charAt(j)){
                                    this.dfa = false;
                                    return;
                                } else {
                                    this.dfa = true;
                                }

                            }
                        }
                    }
                }
            });
        })
    }
    convert(): Fsm {
        const ConFsm: Fsm = new Fsm;
        let IRstates: string[];
        let IRtrans: string[];
        // let IRtrans = IRtran[];
        this.checkDfa();
        // if this FSA is a NFA
        if(!this.dfa){
            IRstates.push('q0'); // first state will always be q0
            let start = '';
            let end = '';
            let Ttrans = ''; // will temporarily store the data for transitions
            let converting = true;
            let currs = 0;
            while(converting){
                // sets start to the next state currently listed
                start = IRstates[currs];
                // goes through each character of alphabet to find destination from start
                for(let i = 0; i < this.alphabet.length; i++){
                    // will set the temp transition to be the current index of states for start, followed by comma
                    Ttrans = currs + ',' ;
                    // checks for all transitions to find where to go from start
                    this.transitions.forEach(trans=>{
                        // if the trans takes the character
                        if(trans.charactersAccepted.indexOf(this.alphabet[i]) !== -1){
                            // if the current transition examined starts from subset in start
                          if (start.indexOf(trans.startState.label) !== -1) {
                            // adds current transitions end state to current end
                            end = end + trans.endState.label.toString;
                            // if there is at least one transition
                            Ttrans = Ttrans + this.alphabet[i] + ',';
                          }
                        }

                    });
                    // if there is not an instance of the same state
                    if (IRstates.indexOf(end) === -1) {
                        IRstates.push(end);
                    }
                    // will add the index of end state to the temp trans
                    Ttrans = Ttrans + IRstates.indexOf(end);
                    // will push the finished transition
                    // transitions stored as String, "index of start state, charactersAccepted, index of end state"
                    IRtrans.push(Ttrans);
                    end = '';
                }
                // after finding all transitions for a state, procedes to next one
                currs++;
                // need to come up with code to calculate whether there are more possible states
                if(true){
                  converting = true;
                } else {

                }
            }
            // will create a new state for each state generated via subset construction
            // for future will get screen size and randomly pick x/y withing screen size
            IRstates.forEach(state => {
                let x = 50;
                let y = 50;
                ConFsm.addNewState(x, y);
            });
            // temp variable to store string
            let Ttrans2:string[];
            IRtrans.forEach(trans =>{
                // splits the string storing a transition
                Ttrans2 = trans.split(',');
                // adds a new transition to the new FSM using the indices for start and finish, as well as accepted characters
                ConFsm.addNewTransition(ConFsm.states[Ttrans2[0]], ConFsm.states[Ttrans2[2]], Ttrans2[1]);
            });
            // sets the new FSM to be listed as DFA
            ConFsm.dfa = true;
            // returns new FSM with states and transitions
          return ConFsm;
          // if the FSM is a DFA
        } else {
          return this;
        }
    }
    addNewState(x: number, y: number) {
        // find first available state name starting with a q
        const stateMap = {};
        this.states.forEach(state => stateMap[state.label] = true);
        let i = 0;
        while (stateMap['q' + i]) { i++; }
        const newState = new FsmState({ x: x, y: y, label: 'q' + i, start: false, final: false });
        this.states.push(newState);
        this._dirty = true;
        return newState;
    }
    addNewTransition(startState: FsmState, endState: FsmState, characters = 'a') {
        // make sure it is unique between states
        // added additional code for when doing subset construction
        if (this.transitions.filter(trans => trans.startState === startState && trans.endState === endState).length > 0) {
          // should be a list of single transition matching start and end
          let t: FsmTransition[] = this.transitions.filter(trans => trans.startState === startState && trans.endState === endState);
          // if the characters of new transition not in old then add them
          let c: string[] = characters.split('');
          // will check each letter of the accepted characters and see if they exist yet
          c.forEach(letter => {
            if(t[0].charactersAccepted.indexOf(characters) === -1){
              this.transitions[this.transitions.indexOf(t[0])].charactersAccepted += characters;
            }
          });
          return null;
        }
        const newTrans = new FsmTransition(
            { charactersAccepted: characters, rotation: 0.0, startState: startState.label, endState: endState.label },
            startState, endState);
        this.transitions.push(newTrans);
        // constant to store the accepted characters of new transition
        const charExt = newTrans.charactersAccepted;
        // goes through previous constant to check each character
        for (let i = 0; i < charExt.length; i++) {
            // if the character is not in the alphabet
            if (this.alphabet.indexOf(charExt.charAt(i)) === -1) {
                // add character to alphabet
                this.alphabet.push(charExt.charAt(i));
            }
        }
        this._dirty = true;
        return newTrans;
    }
    deleteState(state: FsmState) : FsmState {
        const position = this.states.indexOf(state);
        if (position > -1) {
            this.states.splice(position, 1);
            this.deleteTransitionsForState(state);
            this._dirty = true;
        }
        return state;
    }
    private deleteTransitionsForState(state: FsmState) {
        this.transitions = this.transitions.filter(trans => trans.startState !== state && trans.endState !== state);
    }

    deleteTransition(transition: FsmTransition) {
        const position = this.transitions.indexOf(transition);
        if (position > -1) {
            this.transitions.splice(position, 1);
            this._dirty = true;
        }
        return transition;
    }
}
