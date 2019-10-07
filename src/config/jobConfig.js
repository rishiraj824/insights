export const jobConfig = {
  DESIGN_MIDDLE: 'Designer (Lateral)',
  DESIGN_BOTTOM: 'Designer (Fresher)'
};

export const getResolvedRoleName = role => (jobConfig[role] !== undefined ? jobConfig[role] : role);
