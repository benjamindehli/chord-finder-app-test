import * as Tone from 'tone';

const initialState = new Tone.PolySynth(Tone.Synth).toDestination();;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
}

export default reducer;
