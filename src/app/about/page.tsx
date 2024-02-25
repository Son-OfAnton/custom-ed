import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavBar from "@/components/NavBar";
const page = () => {
  return (
    
    <div className="mb-40">
        <NavBar/>
      <div className="col-span-12 md:col-span-11 md:mx-20  mb-7 flex justify-center">
            <Card className="md:mt-60 mt-24">
              <CardHeader>
                <CardTitle className="md:text-5xl  text-2xl font-bold text-center md:my-10">
                  About us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="md:text-lg text-xs md:mx-9 mx-2 text-black">
                    Welcome to Custom-ed, a pioneering force reshaping the educational landscape for the contemporary world. Our inception was inspired by a fundamental observation: the conventional educational paradigm frequently proves inadequate in catering to the multifaceted needs and varied learning modalities of today's students. This realization served as the catalyst for our mission to revolutionize education.

In delving deeper into the challenges plaguing traditional education, we uncovered a pressing issue: the standardized approach to teaching and learning overlooks the rich tapestry of individual learning styles and preferences. This oversight often culminates in disengagement among learners and acts as a barrier to their academic progression.

Moreover, as we scrutinized the traditional educational framework, it became evident that its rigidity stifles innovation and fails to adapt to the rapidly evolving educational landscape. The one-size-fits-all model fails to account for the diverse backgrounds, interests, and aptitudes of students, resulting in a systemic failure to unlock their full potential.

Armed with this insight, we embarked on a transformative journey aimed at dismantling the barriers hindering educational attainment. We envisioned a future where education is not merely a means of imparting knowledge but a dynamic and inclusive process tailored to the unique needs of each learner.

At Custom-ed, we are committed to harnessing the power of technology and pedagogical innovation to create a learning ecosystem that is as diverse and dynamic as the students it serves. Our approach prioritizes personalized learning experiences, fostering engagement, and empowering students to thrive in an ever-changing world.

Join us on our mission to redefine education for the modern era. Together, we can build a future where every learner has the opportunity to excel and realize their full potential.

                </CardDescription>
              </CardContent>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </div>
      <div className="col-span-12 md:col-span-11 md:mx-20  mb-7 flex justify-center">
            <Card>
              <CardHeader>
                <CardTitle className="md:text-3xl text-xl font-bold text-center my-10">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="md:text-lg text-xs md:mx-9 mx-2 text-black">
                 At Custom-ed, we envision an educational landscape where every learner can thrive. We believe in harnessing the power of technology to create a personalized and inclusive learning experience that empowers students to reach their full potential.
                </CardDescription>
              </CardContent>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-12 md:mx-20  mb-7 flex justify-center">
            <Card>
              <CardHeader>
                <CardTitle className="md:text-3xl text-xl font-bold text-center my-10">
                 Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="md:text-lg text-xs md:mx-9 mx-2 text-black">
                  Driven by a passion for innovation and a commitment to excellence, our mission is to revolutionize education through the integration of personalized learning principles and cutting-edge artificial intelligence technology. We aim to break down barriers to learning, foster engagement, and pave the way for a brighter future.
                </CardDescription>
              </CardContent>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-12 md:mx-20  mb-7 flex justify-center">
            <Card>
              <CardHeader>
                <CardTitle className="md:text-3xl text-xl font-bold text-center my-10">
                Our Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="md:text-lg text-xs md:mx-9 mx-2 text-black">
                 Our approach is centered around adaptability, customization, and empowerment. By leveraging AI, we provide students with a dynamic learning path tailored to their individual needs and preferences. Through milestone assessments and comprehensive analytics, we offer educators valuable insights to support student success. 
                </CardDescription>
              </CardContent>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-12 md:mx-20  mb-7 flex justify-center">
            <Card>
              <CardHeader>
                <CardTitle className="md:text-3xl text-xl font-bold text-center my-10">
                Benefits for Students and Teachers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="md:text-lg text-xs md:mx-9 mx-2 text-black">
                 For students, our system provides a tailored learning experience that caters to their individual needs and preferences. By offering customized learning paths, we promote engagement and empower students to take ownership of their education.

For teachers, our platform offers valuable insights into student engagement and comprehension. By identifying hot topics and areas of difficulty, teachers can refine their instructional strategies to better meet the needs of their students.
                </CardDescription>
              </CardContent>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </div>
    </div>
  )
}

export default page
