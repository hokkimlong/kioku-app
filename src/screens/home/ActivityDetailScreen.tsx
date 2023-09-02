import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import PostThumbnail from '~/components/thumbnail/postThumbnail';

const img =
  'https://jade-decisive-mouse-858.mypinata.cloud/ipfs/QmbwQsffkJfqsoFUUsAbfAd15pwwQ8HCTYmGFnt1NRMPEq';

const data = [
  {
    id: '1',
    publisher: 'SothKimleng',
    caption: 'Journey to the west',
    imageUrL: img,
    reactAmount: 10,
    commentAmount: 4,
  },
  {
    id: '2',
    publisher: 'SothKimleng',
    caption: 'Journey to the west',
    imageUrL: img,
    reactAmount: 10,
    commentAmount: 4,
  },
];

const ActivityDetailScreen = () => {
  return (
    <TitleContainer scroll title="Let's Hang out man">
      {data?.map(item => (
        <PostThumbnail
          key={item.id}
          publisher={item.publisher}
          imageUrl={item.imageUrL}
          caption={item.caption}
          reactionAmount={item.reactAmount}
          commentAmount={item.commentAmount}
        />
      ))}
    </TitleContainer>
  );
};

export default ActivityDetailScreen;
