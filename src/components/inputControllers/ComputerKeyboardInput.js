// Dependencies
import {Component} from 'react';
import {connect} from 'react-redux';

// Actions
import {toggleNote} from 'actions/NotesActions';
import {updateSelectedSelectionNameFromNotes} from 'actions/SelectedSelectionNameActions';

// Helpers
import {getNoteByNoteNumber} from 'helpers/noteHelpers';


class ComputerKeyboardInput extends Component {
  constructor(props) {
    super(props);
    this.keyDownFunction = this.keyDownFunction.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownFunction, false);
  }

  handleNoteToggle(checked, noteNumber, selectedKeyNumber, noteSelections, selectedSelectionType) {
    const newNotes = this.props.toggleNote(noteNumber, checked);
    this.props.updateSelectedSelectionNameFromNotes(newNotes, selectedKeyNumber, noteSelections, selectedSelectionType);
  }

  keyDownFunction(event) {
    if (!this.props.computerKeyboardInputEnabled){
      return false;
    }
    const keyNumber = this.props.keyCodeNoteNumbers[event.keyCode];
    if(typeof keyNumber === 'number'){
      const note = getNoteByNoteNumber(this.props.notes, keyNumber);
      const noteSelections = this.props.selectedSelectionType === 'scale'
        ? this.props.scales
        : this.props.chords;
      this.handleNoteToggle(!note.selected, keyNumber, this.props.selectedKeyNumber, noteSelections, this.props.selectedSelectionType)
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scales,
  selectedSelectionType: state.selectedSelectionType,
  selectedKeyNumber: state.selectedKeyNumber,
  keyCodeNoteNumbers: state.keyCodeNoteNumbers,
  computerKeyboardInputEnabled: state.computerKeyboardInputEnabled
});

const mapDispatchToProps = {
  toggleNote,
  updateSelectedSelectionNameFromNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(ComputerKeyboardInput);
