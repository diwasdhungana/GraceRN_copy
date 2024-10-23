export const requestDataCreator = (dataTunnel, setResponse) => {
  const data = dataTunnel();
  const { selectedQuestionType } = data;
  switch (selectedQuestionType) {
    case 'selectOne':
      return selectOneRequestCreator(data, setResponse);
    case 'matrixNGridBool':
      return matrixNGridBoolRequestCreator(data, setResponse);
    case 'matrixNGridMult':
      return matrixNGridMultRequestCreator(data, setResponse);
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
    subjects: [data.selectedSubject],
    systems: [data.selectedSystem],
    points: data.points,
    type: 'Traditional',
    explanation: data.explanation,
    categories: ['data.selectedCategory'],
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
    subjects: [data.selectedSubject],
    systems: [data.selectedSystem],
    points: data.points,
    type: 'Traditional',
    explanation: data.explanation,
    categories: [data.selectedCategory],
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
  variables.correctOptions = data.options.reduce((acc, option, index) => {
    if (option.checked) {
      acc.push(index);
    }
    return acc;
  }, []);
  return variables;
};

export const matrixNGridBoolRequestCreator = (data, setResponse) => {};
export const matrixNGridMultRequestCreator = (data, setResponse) => {};
export const highlightRequestCreator = (data, setResponse) => {};
export const extDropDownRequestCreator = (data, setResponse) => {};
export const dragNDropRequestCreator = (data, setResponse) => {};
export const bowTieRequestCreator = (data, setResponse) => {};
