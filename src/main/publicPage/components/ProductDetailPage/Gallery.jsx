import React from "react";
import Slider from "react-slick";
import { Image, Icon, Container, Segment } from "semantic-ui-react";

export default class Gallery extends React.Component {
  render() {
    const { images } = this.props;
    const settings = {
      dots: true,
      lazyLoad: true,
      dotsClass: "slick-dots p4",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Container >
        <Slider {...settings}>
          {images.map((image, key) => {
            return (
              <div key={key}>
                <Image size="massive" src={image} />
              </div>
            );
          })}
        </Slider>
      </Container>
    );
  }
}
