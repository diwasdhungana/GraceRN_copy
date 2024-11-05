export const requestDataCreator = (dataTunnel, setResponse) => {
  const data = dataTunnel();
  const { selectedQuestionType } = data;
  switch (selectedQuestionType) {
    case 'selectOne':
      return selectOneRequestCreator(data, setResponse);
    case 'matrixNGrid':
      return matrixNGridRequestCreator(data, setResponse);
    case 'highlight':
      return highlightRequestCreator(data, setResponse);
    case 'extDropDown':
      return extDropDownRequestCreator(data, setResponse);
    case 'dragNDrop':
      return dragNDropRequestCreator(data, setResponse);
    case 'bowTie':
      return bowTieRequestCreator(data, setResponse);
    case 'mcq':
      return mcqRequestCreator(data, setResponse);
    default:
      return null;
  }
};

export const selectOneRequestCreator = (data, setResponse) => {
  setResponse({});
  const variables: {
    title: any;
    kind: string;
    subject: any;
    system: any;
    points: any;
    type: string;
    explanation: any;
    options?: any[];
    correct?: number[];
  } = {
    title: data.title,
    kind: 'Select One',
    subject: data.selectedSubject,
    system: data.selectedSystem,
    points: data.points,
    type: 'Traditional',
    explanation: data.explanation,
  };
  if (!data.title) {
    setResponse({ titleError: 'Title is required' });
    return { variables, valid: false };
  }
  if (data.options.length < 2) {
    setResponse({ optionsError: 'At lease 2 options required.' });
    return { variables, valid: false };
  }
  if (data.options.filter((opt) => opt.checked).length === 0) {
    setResponse({ optionsError: 'At least one option must be selected' });
    return { variables, valid: false };
  }
  if (data.points < 1 || data.points > 20) {
    setResponse({ pointsError: 'Points should be between 1 and 20' });
    return { variables, valid: false };
  }
  if (data.explanation.length < 10) {
    setResponse({ explanationError: 'Explanation should be at least 10 characters long' });
    return { variables, valid: false };
  }

  if (data.hasAssistanceColumn) {
    if (!data.assistanceTitle) {
      setResponse({ assiatanceError: 'Assistance title is required' });
      return { variables, valid: false };
    }
    variables.assistanceColumn = { title: data.assistanceTitle };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.hasTabsInAssistance = true;
      if (!data.tabsData.title.length) {
        setResponse({ assiatanceError: 'At least one tab is required' });
        return { variables, valid: false };
      }
      if (!data.tabsData.content.length) {
        setResponse({ assiatanceError: 'At least one tab content is required' });
        return { variables, valid: false };
      }

      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        if (!title) {
          setResponse({ assiatanceError: 'Tab title is required' });
          return { variables, valid: false };
        }
        if (!data.tabsData.content[index]) {
          setResponse({ assiatanceError: 'Tab content is required' });
          return { variables, valid: false };
        }
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
      if (!data.assistanceData) {
        setResponse({ assiatanceError: 'Assistance data is required' });
        return { variables, valid: false };
      }
      variables.assistanceColumn.assistanceData = data.assistanceData;
    }
  }

  variables.options = data.options.map((option) => {
    return {
      value: option.value,
    };
  });
  //set an array of indexes of correct options
  variables.correct = data.options.reduce((acc, option, index) => {
    if (option.checked) {
      acc.push(index);
    }
    return acc;
  }, []);
  return { variables, valid: true };
};

export const mcqRequestCreator = (data, setResponse) => {
  const variables = {
    title: data.title,
    kind: 'Select all that apply',
    subject: data.selectedSubject,
    system: data.selectedSystem,
    points: data.points,
    type: 'Traditional',
    explanation: data.explanation,
  };
  if (!data.title) {
    setResponse({ titleError: 'Title is required' });
    return { variables, valid: false };
  }
  if (data.options.length < 2) {
    setResponse({ optionsError: 'At lease 2 options required.' });
    return { variables, valid: false };
  }
  if (data.options.filter((opt) => opt.checked).length === 0) {
    setResponse({ optionsError: 'At least one option must be selected' });
    return { variables, valid: false };
  }
  if (data.points < 1 || data.points > 20) {
    setResponse({ pointsError: 'Points should be between 1 and 20' });
    return { variables, valid: false };
  }
  if (data.explanation.length < 10) {
    setResponse({ explanationError: 'Explanation should be at least 10 characters long' });
    return { variables, valid: false };
  }
  if (data.hasAssistanceColumn) {
    if (!data.assistanceTitle) {
      setResponse({ assiatanceError: 'Assistance title is required' });
      return { variables, valid: false };
    }
    variables.assistanceColumn = { title: data.assistanceTitle };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.hasTabsInAssistance = true;
      if (!data.tabsData.title.length) {
        setResponse({ assiatanceError: 'At least one tab is required' });
        return { variables, valid: false };
      }
      if (!data.tabsData.content.length) {
        setResponse({ assiatanceError: 'At least one tab content is required' });
        return { variables, valid: false };
      }

      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        if (!title) {
          setResponse({ assiatanceError: 'Tab title is required' });
          return { variables, valid: false };
        }
        if (!data.tabsData.content[index]) {
          setResponse({ assiatanceError: 'Tab content is required' });
          return { variables, valid: false };
        }
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
      if (!data.assistanceData) {
        setResponse({ assiatanceError: 'Assistance data is required' });
        return { variables, valid: false };
      }
      variables.assistanceColumn.assistanceData = data.assistanceData;
    }
  }

  variables.options = data.options.map((option) => {
    return {
      value: option.value,
    };
  });
  //set an array of indexes of correct options
  variables.correct = data.options.reduce((acc, option, index) => {
    if (option.checked) {
      acc.push(index);
    }
    return acc;
  }, []);
  return { variables, valid: true };
};

export const matrixNGridRequestCreator = (data, setResponse) => {
  const variables = {
    title: data.title,
    kind: 'Grid and Matrix',
    subject: data.selectedSubject,
    system: data.selectedSystem,
    points: data.points,
    type: 'Next Gen',
    explanation: data.explanation,
    radio: data.selectionType == 'radio' ? true : false,
    options: {
      head: data.options[0].map((column) => {
        return column.value;
      }),
      rows: data.options.slice(1).map((row) => {
        return row[0].value;
      }),
    },
  };
  if (!data.title) {
    setResponse({ titleError: 'Title is required' });
    return { variables, valid: false };
  }
  // check if the variables.options.rows as empty values
  if (variables.options.rows.filter((row) => !row).length > 0) {
    setResponse({ optionsError: 'At least one row is empty' });
    return { variables, valid: false };
  }

  if (variables.options.head.filter((column) => !column).length > 0) {
    setResponse({ optionsError: 'At least one column is empty' });
    return { variables, valid: false };
  }

  if (data.points < 1 || data.points > 20) {
    setResponse({ pointsError: 'Points should be between 1 and 20' });
    return { variables, valid: false };
  }
  if (data.explanation.length < 10) {
    setResponse({ explanationError: 'Explanation should be at least 10 characters long' });
    return { variables, valid: false };
  }

  if (data.hasAssistanceColumn) {
    if (!data.assistanceTitle) {
      setResponse({ assiatanceError: 'Assistance title is required' });
      return { variables, valid: false };
    }
    variables.assistanceColumn = { title: data.assistanceTitle };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.hasTabsInAssistance = true;
      if (!data.tabsData.title.length) {
        setResponse({ assiatanceError: 'At least one tab is required' });
        return { variables, valid: false };
      }
      if (!data.tabsData.content.length) {
        setResponse({ assiatanceError: 'At least one tab content is required' });
        return { variables, valid: false };
      }

      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        if (!title) {
          setResponse({ assiatanceError: 'Tab title is required' });
          return { variables, valid: false };
        }
        if (!data.tabsData.content[index]) {
          setResponse({ assiatanceError: 'Tab content is required' });
          return { variables, valid: false };
        }
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
      if (!data.assistanceData) {
        setResponse({ assiatanceError: 'Assistance data is required' });
        return { variables, valid: false };
      }
      variables.assistanceColumn.assistanceData = data.assistanceData;
    }
  }

  variables.correct = variables.options.rows.map((row, index) => {
    return {
      key: row,
      values: data.options[index + 1]
        .map((column, index) => (column.checked ? variables.options.head[index] : null))
        .filter((n) => n),
    };
  });

  if (variables.correct.filter((row) => row.values.length === 0).length > 0) {
    setResponse({ optionsError: 'At least one correct answer is required in every row' });
    return { variables, valid: false };
  }
  return { variables, valid: true };
};

export const highlightRequestCreator = (data, setResponse) => {
  const variables = {
    title: data.title,
    kind: 'Highlight',
    subject: data.selectedSubject,
    system: data.selectedSystem,
    points: data.points,
    type: 'Next Gen',
    explanation: data.explanation,
    correct: data.correct,
    options: data.options,
  };
  if (!data.title) {
    setResponse({ titleError: 'Title is required' });
    return { variables, valid: false };
  }
  //data.options is a string and it must contain atlleast 2 'class="highlight"' in it.
  if (data.options.split('class="highlight"').length < 3) {
    setResponse({ optionsError: 'At lease 2 options required.' });
    return { variables, valid: false };
  }
  if (data.correct.length == 0) {
    setResponse({ optionsError: 'At lease 1 options must be highlighted as correct.' });
    return { variables, valid: false };
  }
  if (data.explanation.length < 10) {
    setResponse({ explanationError: 'Explanation should be at least 10 characters long' });
    return { variables, valid: false };
  }
  if (data.hasAssistanceColumn) {
    if (!data.assistanceTitle) {
      setResponse({ assiatanceError: 'Assistance title is required' });
      return { variables, valid: false };
    }
    variables.assistanceColumn = { title: data.assistanceTitle };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.hasTabsInAssistance = true;
      if (!data.tabsData.title.length) {
        setResponse({ assiatanceError: 'At least one tab is required' });
        return { variables, valid: false };
      }
      if (!data.tabsData.content.length) {
        setResponse({ assiatanceError: 'At least one tab content is required' });
        return { variables, valid: false };
      }

      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        if (!title) {
          setResponse({ assiatanceError: 'Tab title is required' });
          return { variables, valid: false };
        }
        if (!data.tabsData.content[index]) {
          setResponse({ assiatanceError: 'Tab content is required' });
          return { variables, valid: false };
        }
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
      if (!data.assistanceData) {
        setResponse({ assiatanceError: 'Assistance data is required' });
        return { variables, valid: false };
      }
      variables.assistanceColumn.assistanceData = data.assistanceData;
    }
  }

  return { variables, valid: true };
};
export const extDropDownRequestCreator = (data, setResponse) => {
  const variables = {
    title: data.title,
    kind: 'Extended Dropdown',
    subject: data.selectedSubject,
    system: data.selectedSystem,
    points: data.points,
    type: 'Next Gen',
    explanation: data.explanation,
    correct: data.correctAnswer,
    options: data.options,
  };
  if (!data.title) {
    setResponse({ titleError: 'Title is required' });
    return { variables, valid: false };
  }
  // options will have an array of objects with type either text or dropdown
  //atleast one dropdown is required
  if (data.options.filter((opt) => opt.type === 'dropdown').length === 0) {
    setResponse({ optionsError: 'At lease 1 dropdown required.' });
    return { variables, valid: false };
  }

  //each type of dropdown should have atleast 2 options in values
  if (data.options.filter((opt) => opt.type === 'dropdown' && opt?.value?.length < 2).length > 0) {
    setResponse({ optionsError: 'Each dropdown should have at least 2 options' });
    return { variables, valid: false };
  }

  // atlease one text type is required
  if (data.options.filter((opt) => opt.type === 'text').length === 0) {
    setResponse({ optionsError: 'At lease 1 text type required.' });
    return { variables, valid: false };
  }

  if (data.explanation.length < 10) {
    setResponse({ explanationError: 'Explanation should be at least 10 characters long' });
    return { variables, valid: false };
  }

  if (data.hasAssistanceColumn) {
    if (!data.assistanceTitle) {
      setResponse({ assiatanceError: 'Assistance title is required' });
      return { variables, valid: false };
    }
    variables.assistanceColumn = { title: data.assistanceTitle };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.hasTabsInAssistance = true;
      if (!data.tabsData.title.length) {
        setResponse({ assiatanceError: 'At least one tab is required' });
        return { variables, valid: false };
      }
      if (!data.tabsData.content.length) {
        setResponse({ assiatanceError: 'At least one tab content is required' });
        return { variables, valid: false };
      }

      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        if (!title) {
          setResponse({ assiatanceError: 'Tab title is required' });
          return { variables, valid: false };
        }
        if (!data.tabsData.content[index]) {
          setResponse({ assiatanceError: 'Tab content is required' });
          return { variables, valid: false };
        }
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
      if (!data.assistanceData) {
        setResponse({ assiatanceError: 'Assistance data is required' });
        return { variables, valid: false };
      }
      variables.assistanceColumn.assistanceData = data.assistanceData;
    }
  }

  return { variables, valid: true };
};
export const dragNDropRequestCreator = (data, setResponse) => {
  const variables = {
    title: data.title,
    kind: 'Drag and Drop',
    subject: data.selectedSubject,
    system: data.selectedSystem,
    points: data.points,
    type: 'Next Gen',
    explanation: data.explanation,
    correct: data.correct,
    options: data.options,
  };
  if (!data.title) {
    setResponse({ titleError: 'Title is required' });
    return { variables, valid: false };
  }

  if (data.options.values.length < 2) {
    setResponse({ optionsError: 'At lease 2 options required.' });
    return { variables, valid: false };
  }

  if (data.correct.length === 0) {
    setResponse({ optionsError: 'Drag and drop atleast one Item.' });
    return { variables, valid: false };
  }

  if (data.points < 1 || data.points > 20) {
    setResponse({ pointsError: 'Points should be between 1 and 20' });
    return { variables, valid: false };
  }
  if (data.explanation.length < 10) {
    setResponse({ explanationError: 'Explanation should be at least 10 characters long' });
    return { variables, valid: false };
  }
  if (data.hasAssistanceColumn) {
    if (!data.assistanceTitle) {
      setResponse({ assiatanceError: 'Assistance title is required' });
      return { variables, valid: false };
    }
    variables.assistanceColumn = { title: data.assistanceTitle };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.hasTabsInAssistance = true;
      if (!data.tabsData.title.length) {
        setResponse({ assiatanceError: 'At least one tab is required' });
        return { variables, valid: false };
      }
      if (!data.tabsData.content.length) {
        setResponse({ assiatanceError: 'At least one tab content is required' });
        return { variables, valid: false };
      }

      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        if (!title) {
          setResponse({ assiatanceError: 'Tab title is required' });
          return { variables, valid: false };
        }
        if (!data.tabsData.content[index]) {
          setResponse({ assiatanceError: 'Tab content is required' });
          return { variables, valid: false };
        }
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
      if (!data.assistanceData) {
        setResponse({ assiatanceError: 'Assistance data is required' });
        return { variables, valid: false };
      }
      variables.assistanceColumn.assistanceData = data.assistanceData;
    }
  }

  return { variables, valid: true };
};
export const bowTieRequestCreator = (data, setResponse) => {};
