import React from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import WordList from "components-app/WordList";

const GET_ALL_WORDS = gql`
  query User($id: Int!) {
    getUser(id: $id) {
      username
      wordDefs {
        id
        definition
        votes
        word {
          word
        }
        tags {
          tag
        }
      }
    }
  }
`;

const UserWords = ({ className }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ALL_WORDS, {
    variables: { id: parseInt(id) },
  });
  const _className = classNames(className, styles.userPage);

  //   TODO: implement
  if (loading) return null;
  if (error) return `Error! ${error}`;

  let noWordsText;
  let wordList;
  const { getUser } = data;

  if (!getUser) noWordsText = `User not found!`;
  else if (!getUser.wordDefs.length)
    noWordsText = `no entries found for User id ${id}`;
  else wordList = getUser.wordDefs;

  return (
    <div className={_className}>
      <WordList headingText={id} noWordsText={noWordsText} words={wordList} />
    </div>
  );
};

export default UserWords;
