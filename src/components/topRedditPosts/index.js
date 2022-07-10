import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { formatDate } from '../../util'
import './styles.css';

function TopRedditPosts() {

  const [topPosts, setTopPosts] = useState();
  const [subReddit, setSubReddit] = useState('SatoshiStreetBets');

  useEffect(() => {
    async function fetchData2() {
      try {
        const url = process.env['REACT_APP_FETECH_TOP_REDDIT'].replace('@sub@', subReddit);
        let resp = await axios.get(url);
        setTopPosts(mutateResp(resp.data?.data?.children));
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
        url: resp[i].data?.url,
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
            {formatDate(new Date(post.created * 1000))}
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
