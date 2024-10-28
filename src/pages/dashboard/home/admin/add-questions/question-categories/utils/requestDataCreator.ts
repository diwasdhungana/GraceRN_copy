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
  const variables = {
    title: data.title,
    kind: 'Select One',
    subject: data.selectedSubject,
    system: data.selectedSystem,
    points: data.points,
    type: 'Traditional',
    explanation: data.explanation,
  };
  if (data.hasAssistanceColumn) {
    variables.assistanceColumn = {
      title: data.assistanceTitle,
    };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
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
  return variables;
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
  if (data.hasAssistanceColumn) {
    variables.assistanceColumn = {
      title: data.assistanceTitle,
    };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
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
  return variables;
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
    options: data.options.map((opt) => {
      return opt.map((op) => ({ ...op, checked: false }));
    }),
  };
  if (data.hasAssistanceColumn) {
    variables.assistanceColumn = {
      title: data.assistanceTitle,
    };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
      variables.assistanceColumn.assistanceData = data.assistanceData;
    }
  }
  //option is a 2D array of options, which has a checked property in each option
  //correct is an array of indexes of correct options
  variables.correct = data.options.map((row) => {
    return row.reduce((acc, option, index) => {
      if (option.checked) {
        acc.push(index);
      }
      return acc;
    }, []);
  });
  return variables;
};
export const highlightRequestCreator = (data, setResponse) => {};
export const extDropDownRequestCreator = (data, setResponse) => {
  console.log('reached to the extDropDownRequestCreator');
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
  if (data.hasAssistanceColumn) {
    variables.assistanceColumn = {
      title: data.assistanceTitle,
    };
    if (data.hasTabsInAssistance) {
      variables.assistanceColumn.tabs = data.tabsData.title.map((title, index) => {
        return {
          title,
          content: data.tabsData.content[index],
        };
      });
    } else {
      variables.assistanceColumn.assistanceData = data.assistanceData;
    }
  }

  return variables;
};
export const dragNDropRequestCreator = (data, setResponse) => {};
export const bowTieRequestCreator = (data, setResponse) => {};
