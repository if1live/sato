// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    node: Node | null;
    viewer: IViewer | null;
    search: IPlayListItemConnection;
  }

  interface INodeOnQueryArguments {
    id: string;
  }

  interface ISearchOnQueryArguments {
    first?: number | null;
    after?: string | null;
    last?: number | null;
    before?: string | null;
  }

  type Node = IPlayListItem | IVideo;

  interface INode {
    __typename: 'Node';
    id: string;
  }

  interface IViewer {
    __typename: 'Viewer';
    playlist: IPlayList | null;
  }

  interface IPlayList {
    __typename: 'PlayList';
    random: IPlayListItem | null;
  }

  interface IPlayListItem {
    __typename: 'PlayListItem';
    id: string;
    videoId: string;
    video: IVideo | null;
  }

  /**
   * ytdl-core, videoInfo
   */
  interface IVideo {
    __typename: 'Video';
    id: string;
    iv_load_policy: string | null;
    iv_allow_in_place_switch: string | null;
    iv_endscreen_url: string | null;
    iv_invideo_url: string | null;
    iv3_module: string | null;
    rmktEnabled: string | null;
    uid: string | null;
    vid: string | null;
    focEnabled: string | null;
    baseUrl: string | null;
    storyboard_spec: string | null;
    serialized_ad_ux_config: string | null;
    player_error_log_fraction: string | null;
    sffb: string | null;
    ldpj: string | null;
    videostats_playback_base_url: string | null;
    innertube_context_client_version: string | null;
    player_response: string | null;
    t: string | null;
    fade_in_start_milliseconds: string;
    timestamp: string;
    ad3_module: string;
    relative_loudness: string;
    allow_below_the_player_companion: string;
    eventid: string;
    token: string;
    atc: string;
    title: string;
    cr: string;
    apply_fade_on_midrolls: string;
    cl: string;
    fexp: Array<string | null>;
    apiary_host: string;
    fade_in_duration_milliseconds: string;
    fflags: string;
    ssl: string;
    pltype: string;
    media: IVideoMedia;
    author: IVideoAuthor;
    enabled_engage_types: string;
    hl: string;
    is_listed: string;
    gut_tag: string;
    apiary_host_firstparty: string;
    enablecsi: string;
    csn: string;
    status: string;
    afv_ad_tag: string;
    idpj: string;
    sfw_player_response: string;
    account_playback_token: string;
    encoded_ad_safety_reason: string;
    tag_for_children_directed: string;
    no_get_video_log: string;
    ppv_remarketing_url: string;

    /**
     * fmt_list: string[][];
     */
    ad_slots: string;
    fade_out_duration_milliseconds: string;
    instream_long: string;
    allow_html5_ads: string;
    core_dbp: string;
    ad_device: string;
    view_count: string;
    itct: string;
    root_ve_type: string;
    excluded_ads: string;
    aftv: string;
    loeid: string;
    cver: string;
    shortform: string;
    dclk: string;
    csi_page_type: string;
    ismb: string;
    gpt_migration: string;
    loudness: string;
    ad_tag: string;
    of: string;
    probe_url: string;
    vm: string;
    afv_ad_tag_restricted_to_instream: string;
    gapi_hint_params: string;
    cid: string;
    c: string;
    oid: string;
    ptchn: string;
    as_launched_in_country: string;
    avg_rating: string;
    fade_out_start_milliseconds: string;
    length_seconds: string;
    midroll_prefetch_size: string;
    allow_ratings: string;
    thumbnail_url: string;
    iurlsd: string;
    iurlmq: string;
    iurlhq: string;
    iurlmaxres: string;
    ad_preroll: string;
    tmi: string;
    keywords: Array<string | null>;
    trueview: string;
    host_language: string;
    innertube_api_key: string;
    show_content_thumbnail: string;
    afv_instream_max: string;
    innertube_api_version: string;
    mpvid: string;
    allow_embed: string;
    ucid: string;
    plid: string;
    midroll_freqcap: string;
    ad_logging_flag: string;
    ptk: string;
    vmap: string;
    watermark: Array<string | null>;
    video_id: string;
    dbp: string;
    ad_flags: string;
    html5player: string;
    dashmpd: string | null;
    dashmpd2: string | null;
    hlsvp: string | null;

    /**
     * formats: videoFormat[];
     */
    published: number | null;
    description: string;

    /**
     * related_videos: relatedVideo[]
     */
    video_url: string;
    no_embed_allowed: boolean | null;
    age_restricted: boolean | null;
  }

  interface IVideoMedia {
    __typename: 'VideoMedia';
    image: string | null;
    category: string;
    category_url: string;
    game: string | null;
    game_url: string | null;
    year: number | null;
    song: string | null;
    artist: string | null;
    artist_url: string | null;
    writers: string | null;
    licensed_by: string | null;
  }

  interface IVideoAuthor {
    __typename: 'VideoAuthor';
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    user: string;
    channel_url: string;
    user_url: string;
  }

  interface IPlayListItemConnection {
    __typename: 'PlayListItemConnection';
    edges: Array<IPlayListItemEdge>;
    pageInfo: IPageInfo;
  }

  interface IPlayListItemEdge {
    __typename: 'PlayListItemEdge';
    cursor: string;
    node: IPlayListItem;
  }

  interface IPageInfo {
    __typename: 'PageInfo';
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    playAudio: IPlayAudioPayload | null;
    stopAudio: IStopAudioPayload | null;
    reloadVideo: IReloadVideoPayload | null;
  }

  interface IPlayAudioOnMutationArguments {
    input?: IPlayAudioInput | null;
  }

  interface IStopAudioOnMutationArguments {
    input?: IStopAudioInput | null;
  }

  interface IReloadVideoOnMutationArguments {
    input?: IReloadVideoInput | null;
  }

  interface IPlayAudioInput {
    clientMutationId: string;
    videoId: string;
  }

  interface IPlayAudioPayload {
    __typename: 'PlayAudioPayload';
    clientMutationId: string;
    ok: boolean | null;
  }

  interface IStopAudioInput {
    clientMutationId: string;
  }

  interface IStopAudioPayload {
    __typename: 'StopAudioPayload';
    clientMutationId: string;
  }

  interface IReloadVideoInput {
    clientMutationId: string;
    videoId?: string | null;
  }

  interface IReloadVideoPayload {
    __typename: 'ReloadVideoPayload';
    clientMutationId: string;
    video: IVideo | null;
  }
}

// tslint:enable
