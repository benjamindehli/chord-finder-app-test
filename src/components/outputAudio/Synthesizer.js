// Dependencies
import {
  Component
} from 'react';
import {
  connect
} from 'react-redux';

// Helpers
import {
  getNoteByNoteNumber
} from 'helpers/noteHelpers';


class Synthesizer extends Component {

  componentDidUpdate(prevProps) {
    const chordHasChanged = this.props.selectedChordName !== prevProps.selectedChordName;
    const scaleHasChanged = this.props.selectedScaleName !== prevProps.selectedScaleName;
    const keyHasChanged = this.props.selectedKeyNumber !== prevProps.selectedKeyNumber;

    const synthesizer = this.props.synthesizer;
    const notes = this.props.notes;
    const selectedSelections = this.props.selectedSelectionType === 'scale' ? this.props.scales : this.props.chords;
    const selectedSelectionName = this.props.selectedSelectionType === 'scale' ? this.props.selectedScaleName : this.props.selectedChordName;


    if (selectedSelectionName && selectedSelectionName !== 'custom') {
      const selectedSelection = selectedSelections[selectedSelectionName];
      const selectedHalfSteps = selectedSelection.halfSteps;
      const selectedNotesTriggerNames = this.getSelectedNotesTriggerNames(selectedHalfSteps, this.props.selectedKeyNumber, notes);

      if (chordHasChanged || (keyHasChanged && this.props.selectedSelectionType === 'chord')) {
        synthesizer.triggerAttackRelease(selectedNotesTriggerNames, 0.5);
      } else if (scaleHasChanged || (keyHasChanged && this.props.selectedSelectionType === 'scale')) {

      }
    }
  }

  getSelectedNotesTriggerNames(halfSteps, selectedKeyNumber, notes) {
    return halfSteps.map(halfStep => {
      const rootOctave = selectedKeyNumber > 5 ? 3 : 4;
      const relativeHalfStep = selectedKeyNumber + halfStep;
      const octave = parseInt(relativeHalfStep / 12) + rootOctave;
      const noteNumber = relativeHalfStep % 12;
      const note = getNoteByNoteNumber(notes, noteNumber);
      return `${note.name}${octave}`;
    })
  };

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scale,
  selectedChordName: state.selectedChordName,
  selectedScaleName: state.selectedScaleName,
  selectedKeyNumber: state.selectedKeyNumber,
  selectedSelectionType: state.selectedSelectionType,
  synthesizer: state.synthesizer
});


export default connect(mapStateToProps, null)(Synthesizer);
