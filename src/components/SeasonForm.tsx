import React, { useState } from "react";
import Season from "../models/Season";
import PackageInfo from "../../package.json";
import { openLinkInBrowser, getAppName } from "../utils/electronUtils";

interface Props {
  onCreate: (season: number) => void;
  latestSeason: number;
}

const SeasonForm = ({ onCreate, latestSeason }: Props) => {
  const [season, setSeason] = useState("");
  const [isValid, setIsValid] = useState(false);

  const saveSeason = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }

    const seasonNumber = parseInt(season, 10);
    new Season({ number: seasonNumber }).save().then(() => {
      setSeason("");
      onCreate(seasonNumber);
    });
  };

  const onSeasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seasonStr = event.target.value;
    if (seasonStr.length < 1) {
      setSeason(seasonStr);
      setIsValid(false);
      return;
    }

    setSeason(seasonStr);
    setIsValid(parseInt(seasonStr, 10) > latestSeason);
  };

  const openReleasesPage = () => {
    const repoUrl = PackageInfo.repository.url;
    const joiner = repoUrl.substr(-1) === "/" ? "" : "/";
    const releasesUrl = `${repoUrl}${joiner}releases`;

    openLinkInBrowser(releasesUrl);
  };

  const appName = getAppName();

  return (
    <form className="Box p-3" onSubmit={saveSeason}>
      <h2 className="h2 text-normal mb-2">Add a season</h2>
      <p>
        <span>A </span>
        <button type="button" className="btn-link" onClick={openReleasesPage}>
          new version
        </button>
        <span> of </span>
        {appName} may have the latest competitive season. If you can't update
        for some reason, you can add a season to continue logging matches.
      </p>
      <dl className="form-group mt-0">
        <dt>
          <label htmlFor="season-number">Season number:</label>
        </dt>
        <dd>
          <input
            id="season-number"
            type="number"
            className="form-control"
            value={season}
            onChange={onSeasonChange}
            min={latestSeason + 1}
            step="1"
            required
          />
        </dd>
      </dl>
      <div className="form-actions">
        <button type="submit" className="btn" disabled={!isValid}>
          Add season
        </button>
      </div>
    </form>
  );
};

export default SeasonForm;
