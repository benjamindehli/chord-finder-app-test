import * as Tone from 'tone';

const synthesizer = new Tone.PolySynth(Tone.Synth).toDestination();

const initialState = synthesizer;

export default function(state = initialState, action) {
	switch(action.type) {
		default:
			return state;
	}
}
