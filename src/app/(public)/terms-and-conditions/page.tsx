import { PRIVACY_POLICY } from "@/_utils/constant";
import PoliciesSection from "@/components/modules/public/policies-section";
import PageTopSection from "@/components/modules/widgets/page-top-section";

const pageTopSection = {
  title: "Terms & Conditions",
  text: "",
};

const beginning1=[
    {
        title:"What Are Cookies",
        content:"As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality."
    },
    {
        title:"How We Use Cookies",
        content:"We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use."
    },
    {
        title:"Disabling Cookies",
        content:"You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies. This Cookies Policy was created with the help of the Cookies Policy Generator."
    }
]



const beginning2=[
    {
        title:"Account related cookies",
        content:"If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out."
    },
    {
        title:"Login related cookies",
        content:"We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in."
    },
    {
        title:"Email newsletters related cookies",
        content:"This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users."
    },
    {
        title:"Forms related cookies",
        content:"When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence."
    }
]

export default function CookiesPolicy() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      <div className="mx-auto mb-16 py-16 w-[90%] px-8 sm:w-2/3 sm:px-12 md:px-16 lg:px-20 xl:px-0 border border-solid border-color-8 rounded-md">
        <div className="mx-auto max-w-[48rem] flex flex-col gap-8">
            <div className="flex flex-col gap-8">
                {beginning1.map((e)=>
                <div className="flex flex-col gap-4">
                    <p className="font-bold">{e.title}</p>
                    <p>{e.content}</p>
                </div>
                )}
            </div>
            <p className="font-bold">The Cookies We Set</p>
            <ul className="flex flex-col gap-8">
                {beginning2.map((e)=>
                <div className="flex flex-col ">
                    <li className="font-bold list-disc">{e.title}</li>
                    <p>{e.content}</p>
                </div>
                )}
            </ul>
            <p className="font-bold">Third Party Cookies</p>
            <ul>
                <div>
                    <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
                    <li className="list-disc">
                    This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
                    </li>
                </div>
            </ul>
            <ul className="flex flex-col gap-4">
                <div>
                    <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>
                    <li className="list-disc">
                    From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.
                    </li>
                </div>
                <div>
                    <li className="list-disc">As we sell products it's important for us to understand statistics about how many of the visitors to our site actually make a purchase and as such this is the kind of data that these cookies will track. This is important to you as it means that we can accurately make business predictions that allow us to monitor our advertising and product costs to ensure the best possible price.</li>
                </div>
            </ul>
            <div className="flex flex-col">
                <p className="font-bold">More Information</p>
                <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
            </div>
            <ul>
                <div>
                    <p>For more general information on cookies, please read the Cookies Policy article.However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>
                    <li className="list-disc">Email: info@onecallfixrepairs.co.uk</li>
                </div>
            </ul>
        </div>
      </div>
    </main>
  );
}



