import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "next/image";
import styles from '../styles/components/bannerSlider.module.scss'

export default function BannerSlider({banners}) {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      stopOnHover={false}
      swipeable={true}
      showThumbs={false}
      showStatus={false}
    >
      {banners.map(banner=> <CarouselItem key={banner.id} coverImage={banner.images} />)}
    </Carousel>
  );
}

function CarouselItem({ coverImage }) {
  return (
    <div className={styles["carousel-item"]}>
      <Image
        src={coverImage}
        objectFit="fill"
        layout="fill"
        priority="false"
      />
    </div>
  );
}
