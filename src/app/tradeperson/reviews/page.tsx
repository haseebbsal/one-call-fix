import { REVIEWS } from "@/_utils/constant";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";
import ReviewsSection from "@/components/modules/tradeperson/reviews-section";

export default function Reviews() {
  return (
    <>
      <LayoutWrapper
        sectionOneTitle="Reviews"
        sectionOneChildren={
          <>
            {REVIEWS.map((review, index) => (
              <ReviewsSection
                key={index}
                avatar={review.avatar}
                name={review.name}
                review={review.review}
                rating={review.rating}
              />
            ))}
          </>
        }
        sectionTwoTitle="Profile"
        sectionTwoChildren={
          <>
            <ProfileCompletion />
          </>
        }
      ></LayoutWrapper>
    </>
  );
}
