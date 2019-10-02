export const jobConfig = {
  FRONTEND_ENGINEER: 'Frontend Engineer',
  MACHINE_LEARNING_ENGINEER: 'Machine Learning Engineer',
  UI_DESIGNER: 'UI Designer'
};

export const getResolvedRoleName = role => (jobConfig[role] !== undefined ? jobConfig[role] : role);
