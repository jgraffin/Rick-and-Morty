export interface EpisodesTypeProps {
  name: string;
  episode: string;
  air_date: string;
}
export interface LocationsTypeProps extends EpisodesTypeProps {
  dimension: string;
  type: string;
}
