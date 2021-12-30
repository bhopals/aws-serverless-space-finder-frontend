import { Component } from "react";
import { DataService } from "../../services/DataService";
import { Space } from "./../../model/Model";
import { SpaceComponent } from "./SpaceComponent";

interface SpacesProps {
  dataService: DataService;
}

interface SpaceState {
  spaces: Space[];
}

export class Spaces extends Component<SpacesProps, SpaceState> {
  constructor(props: SpacesProps) {
    super(props);
    this.state = {
      spaces: [],
    };
    this.reserveSpace = this.reserveSpace.bind(this);
  }

  async componentDidMount() {
    const spaces = await this.props.dataService.getSpaces();
    this.setState({ spaces: spaces });
  }

  private async reserveSpace(spaceId: string) {}

  private renderSpaces() {
    const rows: any[] = [];
    for (const space of this.state.spaces) {
      rows.push(
        <SpaceComponent
          key={space.spaceId}
          location={space.location}
          name={space.name}
          spaceId={space.spaceId}
          reserveSpace={() => this.reserveSpace}
        />
      );
    }
    return rows;
  }

  public render() {
    return (
      <div>
        <h2>Welcome to the Spaces Pages</h2>
        {this.renderSpaces()}
      </div>
    );
  }
}
