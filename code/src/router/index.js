import Vue from 'vue'
import VueRouter from 'vue-router'
import signIn from '@/components/signIn.vue'
import Main from '@/components/Main.vue'
import school_year from '@/views/school_year_prep.vue'
import class_prep from '@/views/class_prep.vue'
import student_report from '@/views/student_report.vue'
import work_program from '@/views/work_program.vue'
import annual_report from '@/views/annual_report.vue'
import choose_class from '@/views/choose_class.vue'
import add_subjects from '@/views//add_subjects.vue'
import add_teachers from '@/views//add_teachers.vue'
import add_students from '@/views//add_students.vue'
import class_time from '@/views/class_time.vue'
import users from '@/views/users.vue'
import teacher_report from '@/views/teacher_report.vue'
import subjects_distribution from '@/views/subjects_distribution.vue'
import students from '@/views/students.vue'

Vue.use(VueRouter)
const baseDir= '/Schools' 
const routes = [
  {
    path: '/',
    name: 'signIn',
    component: signIn
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
  },
  {
    path: '/Students',
    name: 'students',
    component: students
  },
  {
    path: '/school_year',
    name: 'school_year',
    component: school_year
  },
  {
    path: '/classes',
    name: 'class_prep',
    component: class_prep
  },
  {
    path: '/student_report',
    name: 'student_report',
    component: student_report
  },
  {
    path: '/work',
    name: 'work_program',
    component: work_program
  },
  {
    path: '/annual_report',
    name: 'annual_report',
    component: annual_report
  },
  {
    path: '/users',
    name: 'users',
    component: users
  },
  {
    path: '/teacher_report',
    name: 'teacher_report',
    component: teacher_report
  },
  {
    path: '/choose_class',
    name: 'choose_class',
    component: choose_class
  },
  {
    path: '/add_subjects',
    name: 'add_subjects',
    component: add_subjects
  },
  {
    path: '/add_teachers',
    name: 'add_teachers',
    component: add_teachers
  },
  {
    path: '/add_students',
    name: 'add_students',
    component: add_students
  },
  {
    path: '/class_time',
    name: 'class_time',
    component: class_time
  },
  {
    path: '/subjects_distribution',
    name: 'subjects_distribution',
    component: subjects_distribution
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  // }
]

routes.forEach(r=>{r.path = baseDir+r.path})
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
