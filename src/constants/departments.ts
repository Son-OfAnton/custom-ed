export const departments = {
  'Computer Science': 1,
  'Mathematics': 2,
  'Physics': 3,
  'Chemistry': 4,
  'Biology': 5,
}

export const getDepartmentName = (id: number) => {
 switch (id) {
  case 1:
    return 'Computer Science'
  case 2: 
    return 'Mathematics'
  case 3: 
    return 'Physics'
  case 4:
    return 'Chemistry'
  default:
    return 'Biology'
 }
}