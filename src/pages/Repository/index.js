import React, { useState, useEffect } from 'react';
import api from '../services/api';

// import { Container } from './styles';

export default function Repository({ match }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const repoName = decodeURIComponent(match.params.repository);

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
  }, []);

  return <h1>Repository</h1>;
}
