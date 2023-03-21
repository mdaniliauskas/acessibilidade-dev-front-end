import React, {useState} from 'react'

import {
  Card,
  CardBody,
  Flex,
  Input,
  Tag,
  TagCloseButton,
} from '@chakra-ui/react'

const InputTags = () => {
  const [tags, setTags] = useState([]);

  const handleInput = (e) => {
    let tag = e.target.value.toUpperCase().trim();
    if (e.keyCode !== 32) return false;

    if(!tags.includes(tag) && tag !==""){
      setTags([...tags, tag])
    }
    e.target.value = ''
  };

  const onDeleteTag = (elemt) => {
    setTags(tags.filter(t => t!==elemt));
  };

  return (
  <Card>
    <CardBody>
      <Input type="text" onKeyUp={handleInput} />
      <Flex>
        {tags.map((t, index) => (
          <Tag 
            key={index}
            colorScheme='teal'
            m={2}
          >
            {t}
          <TagCloseButton onClick={() => onDeleteTag(t)} />
          </Tag>)
        )}
        </Flex>
      </CardBody>
    </Card>
  )
}

export default InputTags