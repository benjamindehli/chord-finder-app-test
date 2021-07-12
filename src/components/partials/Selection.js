// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


// Actions
import { updateSelectedKeyNumber } from 'actions/SelectedKeyNumberActions';
import { updateSelectedChordName, updateSelectedScaleName, updateSelectedSelectionSelectList } from 'actions/SelectedSelectionNameActions';
import { updateComputerKeyboardInputEnabled } from 'actions/ComputerKeyboardInputEnabledActions';

// Stylesheets
import style from 'components/partials/Selection.module.scss';

class Selection extends Component {

  handleKeyChange(keyNumber) {
    this.props.updateSelectedSelectionSelectList(
      this.props.notes,
      keyNumber,
      this.props.selectedSelectionType === 'scale' ? this.props.selectedScaleName : this.props.selectedChordName,
      this.props.selectedSelectionType === 'scale' ? this.props.scales : this.props.chords,
      'key'
    );
  }

  handleChordChange(chordName) {
    console.log("chord name", chordName)
    this.props.updateSelectedSelectionSelectList(
      this.props.notes,
      this.props.selectedKeyNumber,
      chordName,
      this.props.chords,
      'chord'
    );
  }

  handleScaleChange(scaleName) {
    this.props.updateSelectedSelectionSelectList(
      this.props.notes,
      this.props.selectedKeyNumber,
      scaleName,
      this.props.scales,
      'scale'
    );
  }

  renderKeyOptions(notes) {
    return notes.map(note => {
      return <MenuItem value={note.number} key={note.number}>{note.name}</MenuItem>;
    })
  }

  renderChordOptions(chords) {
    return Object.keys(chords).map(chordName => {
      return <MenuItem key={chordName} value={chordName}>{chordName}</MenuItem>;
    })
  }

  renderScaleOptions(scales) {
    return Object.keys(scales).map(scaleName => {
      return <MenuItem key={scaleName} value={scaleName}>{scaleName}</MenuItem>;
    })
  }


  render() {
    return (
      <div className={style.selection}>
        <FormControl className={style.formControl}>
          <InputLabel id="key-select-label">Key</InputLabel>
          <Select className={style.select} labelId="key-select-label" id="key-select" value={this.props.selectedKeyNumber} onChange={event => this.handleKeyChange(parseInt(event.target.value))}>
            {this.renderKeyOptions(this.props.notes)}
          </Select>
        </FormControl>
        {
          this.props.selectedSelectionType === 'chord'
            ? (<FormControl className={style.formControl}>
              <Autocomplete
                id="chord-select"
                value={this.props.selectedChordName}
                onChange={(event, newValue) => this.handleChordChange(newValue)}
                onFocus={() => this.props.updateComputerKeyboardInputEnabled(false)}
                onBlur={() => this.props.updateComputerKeyboardInputEnabled(true)}
                className={style.select}
                options={Object.keys(this.props.chords)}


                renderInput={(params) => <TextField {...params} label="Chord" variant="outlined" />}
              />


            </FormControl>)
            : (<FormControl className={style.formControl}>
              <InputLabel id="scale-select-label">Scale</InputLabel>
              <Select className={style.select} labelId="scale-select-label" id="scale-select" value={this.props.selectedScaleName} onChange={event => this.handleScaleChange(event.target.value)}>
                {this.renderScaleOptions(this.props.scales)}
              </Select>
            </FormControl>)
        }
      </div>
    )
  }

  /*render() {
    return (<div className={style.selection}>
      <FormControl className={style.formControl}>
        <InputLabel id="key-select-label">Key</InputLabel>
        <Select className={style.select} labelId="key-select-label" id="key-select" value={this.props.selectedKeyNumber} onChange={event => this.handleKeyChange(parseInt(event.target.value))}>
        {this.renderKeyOptions(this.props.notes)}
        </Select>
      </FormControl>
      {
        this.props.selectedSelectionType === 'chord'
          ? (<FormControl className={style.formControl}>
            <InputLabel id="chord-select-label">Chord</InputLabel>
            <Select className={style.select}
                    labelId="chord-select-label"
                    id="chord-select"
                    value={this.props.selectedChordName}
                    onChange={event => this.handleChordChange(event.target.value)}>
            {this.renderChordOptions(this.props.chords)}
            </Select>
          </FormControl>)
          : (<FormControl className={style.formControl}>
            <InputLabel id="scale-select-label">Scale</InputLabel>
            <Select className={style.select} labelId="scale-select-label" id="scale-select" value={this.props.selectedScaleName} onChange={event => this.handleScaleChange(event.target.value)}>
            {this.renderScaleOptions(this.props.scales)}
            </Select>
          </FormControl>)
      }
    </div>)
  }*/
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scales,
  selectedKeyNumber: state.selectedKeyNumber,
  selectedChordName: state.selectedChordName,
  selectedScaleName: state.selectedScaleName,
  selectedSelectionType: state.selectedSelectionType
});

const mapDispatchToProps = {
  updateSelectedKeyNumber,
  updateSelectedChordName,
  updateSelectedScaleName,
  updateSelectedSelectionSelectList,
  updateComputerKeyboardInputEnabled
};

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
