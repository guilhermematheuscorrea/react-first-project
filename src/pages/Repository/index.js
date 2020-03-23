import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from '../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';

export default function Repository({ match }) {
  const [repository, setRepository] = useState({
    name: '',
    description: '',
    owner: {
      login: '',
      avatar_url: '',
    },
  });
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const repoName = decodeURIComponent(match.params.repository);

      setLoading(true);

      const [repositoryResponse, issuesResponse] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(repositoryResponse.data);
      setIssues(issuesResponse.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <Loading>
          <FaSpinner color="#FFF" size={70} />
        </Loading>
      )}

      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map((issue) => (
            <li key={issue.id}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={label.id}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    </>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
