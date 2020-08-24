import React from 'react';
import css from './footer.module.css';

export default function Footer() {
  const dateNow = new Date();
  return (
    <div className={css.subfooter}>
      <a href="https://www.linkedin.com/in/tiago--neves/">
        <img
          src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
          alt="Linkedin"
        />
      </a>

      <a href="https://github.com/tiagorockman">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="Github"
        />
      </a>

      <a href="https://stackoverflow.com/users/5853830/tiagorockman">
        <img
          src="https://cdn.sstatic.net/Sites/stackoverflow/company/Img/logos/so/so-icon.svg?v=f13ebeedfa9e"
          alt="StackOverflow"
        />
      </a>
      <div>
      <small>© {dateNow.getFullYear()}</small>
      </div>
      
    </div>
  );
}
