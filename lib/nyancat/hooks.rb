
class NyancatHooksListener < Redmine::Hook::ViewListener
  render_on :view_layouts_base_body_bottom, :partial => "nyancat/nyancat" 
end