const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./page-template');


const promptUser = () => {
return inquirer
.prompt ([
   {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
         if (nameInput){
            return true
         } else {
            console.log('Please enter your name!')
            return false;
         }
      }
   },
   {
      type:'input',
      name:'github',
      message:'Enter your Github Username (Required)',
      validate: nameInput => {
         if (nameInput){
            return true
         } else {
            console.log('Please enter your Github Username Link!')
            return false;
         }
      }
   },
   {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
   },
   {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
         if (confirmAbout) {
            return true;
         } else {
         return false
      }
   }
   },
]);
};

const promptProject = portfolioData => {
   if (!portfolioData.projects) {
   portfolioData.projects = [];
   }   
return inquirer
.prompt ([
   {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required) ',
      validate: nameInput => {
         if (nameInput){
            return true
         } else {
            console.log('Please enter your project name!')
            return false;
         }
      }
   },
   {
      type: 'input' ,
      name: 'description' ,
      message: 'Provide a description of the project (Required)',
      validate: nameInput => {
         if (nameInput){
            return true
         } else {
            console.log('Please enter your project description!')
            return false;
         }
      }
   },
   {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
   } ,
   {
      type:'input',
      name:'link',
      message:'Enter your Github link (Required)',
      validate: nameInput => {
         if (nameInput){
            return true
         } else {
            console.log('Please enter your Github Username Link!')
            return false;
         }
      }
   },
   {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
   } ,
   {
      type: 'confirm',
      name: 'confirmAddProject',
      message: "Would you like to ender another project?",
      default: false
   } ,
])
.then (projectData => {
   portfolioData.projects.push(projectData);
   if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
   } else {
      return portfolioData
   }
})

}
;



const mockData = {
   name: 'Shanice',
   github: 'shanicesauce',
   confirmAbout: true,
   about:
     'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
   projects: [
     {
       name: 'Run Buddy',
       description:
         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
       languages: ['HTML', 'CSS'],
       link: 'https://github.com/shanicesauce/run-buddy',
       feature: true,
       confirmAddProject: true
     },
     {
       name: 'Taskinator',
       description:
         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
       languages: ['JavaScript', 'HTML', 'CSS'],
       link: 'https://github.com/shanicesauce/taskinator',
       feature: true,
       confirmAddProject: true
     },
     {
       name: 'Taskmaster Pro',
       description:
         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
       languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
       link: 'https://github.com/shanicesauce/taskmaster-pro',
       feature: false,
       confirmAddProject: true
     },
     {
       name: 'Robot Gladiators',
       description:
         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
       languages: ['JavaScript'],
       link: 'https://github.com/shanicesauce/robot-gladiators',
       feature: false,
       confirmAddProject: false
     }
   ]
 };

 // promptUser()
// .then(promptProject)
// .then(portfolioData => {
   const pageHtml = generatePage(mockData);

   fs.writeFile('./index.html', pageHtml, err => {
   if (err) throw err;

   console.log('Portfolio complete! Checkout index.html to see the output!');
})
// });