export const getNoteByNoteNumber = (notes, noteNumber) => {
  return notes.find(note => {
    return note.number === noteNumber;
  })
}

export const noteNumberToHalfSteps = (noteNumber, selectedKeyNumber) => {
  return (noteNumber - selectedKeyNumber) % 12 >= 0 ? (noteNumber - selectedKeyNumber) % 12 : (12 + noteNumber - selectedKeyNumber) % 12;
}

export const noteNumbersToHalfSteps = (noteNumbers, selectedKeyNumber) => {
  return noteNumbers.map(noteNumber => {
    return noteNumberToHalfSteps(noteNumber, selectedKeyNumber);
  });
}

export const halfStepsToNoteNumber = (halfStep, selectedKeyNumber) => {
  return (halfStep + selectedKeyNumber) % 12;
}

export const halfStepsToNoteNumbers = (halfSteps, selectedKeyNumber) => {
  return halfSteps.map(halfStep => {
    return halfStepsToNoteNumber(halfStep, selectedKeyNumber);
  });
}

export const getSelectedNoteNumbersFromNotes = notes => {
  return notes.filter(note => {
    return note.selected;
  }).map(note => {
    return note.number;
  });
}

export const getSelectedNotes = notes => {
  return notes.filter(note => {
    return note.selected;
  });
}
