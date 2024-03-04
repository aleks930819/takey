const constructImageUrl = (image: string) => {
  return process.env.NEXT_PUBLIC_API_URL + image;
};

export default constructImageUrl;
