import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { formatDate } from '../../util'
import topTrendingService from '../../services/topTrending.service';
import { useSelector } from 'react-redux';
import './styles.css';

function TopRedditPosts() {

  const [topPosts, setTopPosts] = useState();
  const [subReddit, setSubReddit] = useState('SatoshiStreetBets');
  const timezone = useSelector((state) => state.userSettings.timezone);
  const timeFormat = useSelector((state) => state.userSettings.timeFormat);

  useEffect(() => {
    async function fetchData2() {
      try {
        const resp = await topTrendingService().fetchReddit(subReddit);
        setTopPosts(mutateResp(resp.children));
      } catch(e) {
        console.log(e);
      }
    }
    fetchData2();
  },[subReddit]);

  const openSub = (link) => {
    window.open(link,'_blank');
  }

  const handleSubChange = (e) => {
    setSubReddit(e.target.value.substring(2));
  }

  const mutateResp = (resp) => {
    const mutated = [];
    let count = 0;
    for(let i=0; i<resp.length; i++) {
      if(resp[i].data?.thumbnail.length < 5) continue;
      if(count >= 5) break;
      let altered = {
        title: resp[i].data?.title,
        ups: resp[i].data?.ups,
        thumbnail: resp[i].data?.thumbnail,
        created: resp[i].data?.created,
        url: "https://www.reddit.com" + resp[i].data?.permalink,
        description: resp[i].data?.description
      };
      count++;
      mutated.push(altered);
    }
    return mutated;
  }

  const insertRow = (post) => {
    return (
      <div onClick={() => openSub(post.url)} key={post.title} className="post-row-cont">
        <div className="post-col-content">
          <div className="post-content-title">
            {post.title}
          </div>
          <div className="timestamp">
            {formatDate(post.created * 1000, timeFormat, timezone)}
          </div>
        </div>
        <div className="post-col-img">
          <img src={post.thumbnail} alt="thumbnail"></img>
        </div>
      </div>
    )
  }

  return (
    <div className="top-posts-cont">
      <h4>Top Reddit Posts</h4>
      <div className="sub-select-cont">
        <div>
          <Form.Select className="select-sub-dropdown" value={subReddit} onChange={(e)=>handleSubChange(e)}>
            <option>r/{subReddit}</option>
            <option>r/bitcoin</option>
            <option>r/buttcoin</option>
            <option>r/cryptocurrency</option>
            <option>r/cryptocurrencies</option>
            <option>r/ethereum</option>
            <option>r/SatoshiStreetBets</option>
          </Form.Select>
        </div>
      </div>

      <div>
        {Array.isArray(topPosts) &&
          topPosts.map((row) => {
            return insertRow(row);
          })
        }
      </div>
    </div>
  );
}

export default TopRedditPosts;
