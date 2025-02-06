import React from 'react'
import { useUpdateGuidelineComment } from '../../hooks/guideline/useGuidelineComment';

import { Button } from '@mui/material';

export default function GuidelineComment({comment}) {
    // console.log(comment);

    const {updateGuidelineCommentMutationFn, isUpdatingGuidelineComment, updateGuidelineCommentError} = useUpdateGuidelineComment();
    
    function handleMarkCommentRead(){      
      const updateData = {_id:comment._id, isCommentRead:true}
      
      updateGuidelineCommentMutationFn(updateData)
    }


  return (
    <div className="comments-container">
        <div className="comments-box">
            <p className="comment"> {comment.comment}</p>
            <p className="commenter">-{comment.commenterID.firstName}</p>
            
            <Button onClick={handleMarkCommentRead}>Mark as Read</Button>
        </div>

    </div>  
  )
}
