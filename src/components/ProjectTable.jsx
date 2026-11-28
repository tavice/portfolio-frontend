// Plain index of every project, like the project list on a firm's site.
export default function ProjectTable({ projects }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Project</th>
          <th scope="col" className="col-cat">Type</th>
          <th scope="col" className="col-desc">Description</th>
          <th scope="col" className="links">Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p, i) => (
          <tr key={p.slug}>
            <td>{String(i + 1).padStart(2, '0')}</td>
            <td className="name">{p.name}</td>
            <td className="col-cat muted">{p.category}</td>
            <td className="col-desc muted">{p.summary}</td>
            <td className="links">
              {p.website ? (
                <a href={p.website} target="_blank" rel="noopener noreferrer">
                  {p.status} ↗
                </a>
              ) : (
                <span className="muted">{p.status}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
