const persons = ['jane','John','joe']
for(let i = 0; i < persons.length;i++){
    const person = persons[i];
    if (person === 'john')break;
    console.log(person);
}