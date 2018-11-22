<?php
// Add custom Theme Functions here
/*
add_action( 'wp_enqueue_scripts', function(){
	wp_enqueue_style( 'font-awesome' , get_stylesheet_directory_uri() . '/font-awesome/css/font-awesome.min.css', array(), date('Ymdhis') );
}, 99);
*/

add_shortcode('slide_sanpham', 'slide_sanpham');
function slide_sanpham($atts, $content = null)

 {

    $options = shortcode_atts([
		 'post_type'      => array('post')
		,'posts_per_page' => -1
		,'id'             => ''
		,'orderby'        => 'date'
		,'order'          => 'ASC'
    ], $atts, 'slide_sanpham');
    $args = array(
       'post_type'               => $options['post_type']
      ,'posts_per_page'          => $options['posts_per_page']
      ,'orderby'                 => $options['orderby']
      ,'order'                   => $options['order']
      ,'no_found_rows'           => true
      ,'update_post_term_cache'  => false
      ,'update_post_meta_cache'  => false
      ,'cache_results'           => false
    );

    if( $options['id'] != '' ){
    	$id = explode(',', $options['id']);
    	$args['post__in'] = array($id);
    }

    $posts = get_posts( $args );
    ob_start();
    ?>
    <?php if ($posts): ?>

        <div class="slider-wrapper relative slide-sanpham" id="slider-160989184">
            <div class="slider slider-nav-circle slider-nav-large slider-nav-light slider-style-normal" data-flickity-options='{
	            "cellAlign": "center",
	            "imagesLoaded": true,
	            "lazyLoad": 1,
	            "freeScroll": false,
	            "wrapAround": true,
	            "autoPlay": 6000,
	            "pauseAutoPlayOnHover" : true,
	            "prevNextButtons": true,
	            "contain" : true,
	            "adaptiveHeight" : true,
	            "dragThreshold" : 10,
	            "percentPosition": true,
	            "pageDots": false,
	            "rightToLeft": false,
	            "draggable": true,
	            "selectedAttraction": 0.1,
	            "parallax" : 0,
	            "friction": 0.6
	        }'><?php

	        	$i = 1;
	        	global $post;
	        	foreach ($posts as $post):
					setup_postdata($post);
					if( $i % 10 == 1 ){
						echo '<div class="row">';
					}
                    ?><div class="col medium-3 small-12 large-1-5">
                        <div class="col-inner">
                            <div class="box-product" id="box-product-<?php echo get_the_ID(); ?>">
                            	<div class="center text-center"><?php the_title(); ?></div>
                            </div>
                        </div>
                    </div><?php

                    if( $i % 10 == 0 ){
                    	echo '</div>';
                    }
                    $i++;
                endforeach;
                if( $i % 10 != 0 ){
					echo '</div>';
				}

            ?></div>

            <div class="loading-spin dark large centered"></div>

            <style scope="scope"> </style>
        </div>
        <!-- .ux-slider-wrapper -->

        <div class="product-detail-wrapper row">
			<?php $first_post = $posts[0] ?>
			<div class="col medium-12 small-12 large-12 product-title">
				<h2><?php echo get_the_title($first_post->ID); ?></h2>
			</div>
			<div class="col medium-6 small-12 large-7 product-content">
				<?php echo $first_post->post_content ?>
			</div>
			<div class="col medium-6 small-12 large-5 product-detail">
				<h3 class="title"><?php echo __('PROJECT DESCRIPTION'); ?></h3>
				<div class="entry-content">
					<?php echo get_the_excerpt( $first_post->ID ); ?>
				</div>
				<h3 class="title"><?php echo __('PROJECT DETAILS'); ?></h3>
				<ul class="list-detail">
					<li>
						<span class="title">Client: </span><?php echo get_post_meta( $first_post->ID, '_client', true ); ?>
					</li>
					<li>
						<span class="title">Date: </span>
						<?php
							$datetime = DateTime::createFromFormat('YmdHi', get_the_date('YmdHi'));
							echo $datetime->format('d') . ' ' . $datetime->format('M') . ', ' . $datetime->format('Y');
						 ?>
					</li>
					<li>
						<span class="title">Tags: </span>
						<?php
							$tags = get_the_tags( $first_post->ID );
							if($tags){
								foreach ($tags as $key => $tag) {
									if($key != 0){
										echo ', ';
									}
									echo $tag->name;
								}
							}
						 ?>
					</li>
				</ul>
			</div>
        </div>

        <script type="text/javascript">
        	(function( $ ) {
        		$(document).ready(function(){
        			$('.box-product').click(function(){
        				var id = $(this).attr('id');
        				id = id.replace('box-product-', '');
        				$.ajax({
		                type    : "POST",
		                dataType:"text",
		                url     : '<?php echo admin_url( 'admin-ajax.php' ) ?>',
		                data    : {
		                    action : '_get_detail_product',
		                    id     : id
		                },
		                beforeSend: function(){
		                    $('.product-detail-wrapper').addClass('loadding');
		                },
		                success: function(data) {
		                    $('.product-detail-wrapper').html(data);
		                    $('.product-detail-wrapper').removeClass('loadding');
		                }
		            });
        			});
        		});
			})( jQuery );
        </script>

    <?php endif; ?>
    <?php wp_reset_postdata(); ?>
    <?php
    return ob_get_clean();

}

add_action( 'wp_ajax__get_detail_product'       , '_get_detail_product');
add_action( 'wp_ajax_nopriv__get_detail_product', '_get_detail_product');
function _get_detail_product() {
	if(isset($_POST['id'])){
		$id = $_POST['id'];
		$posts = get_posts(array(
			'p' => $id
			,'no_found_rows'           => true
			,'update_post_term_cache'  => false
			,'update_post_meta_cache'  => false
			,'cache_results'           => false
		));
		ob_start();
		?>
			<?php if ($posts): ?>

				<?php $first_post = $posts[0] ?>
				<div class="col medium-12 small-12 large-12 product-title">
					<h2><?php echo get_the_title($first_post->ID); ?></h2>
				</div>
				<div class="col medium-6 small-12 large-7 product-content">
					<?php echo $first_post->post_content ?>
				</div>
				<div class="col medium-6 small-12 large-5 product-detail">
					<h3 class="title"><?php echo __('PROJECT DESCRIPTION'); ?></h3>
					<div class="entry-content">
						<?php echo get_the_excerpt( $first_post->ID ); ?>
					</div>
					<h3 class="title"><?php echo __('PROJECT DETAILS'); ?></h3>
					<ul class="list-detail">
						<li>
							<span class="title">Client: </span><?php echo get_post_meta( $first_post->ID, '_client', true ); ?>
						</li>
						<li>
							<span class="title">Date: </span>
							<?php
								$datetime = DateTime::createFromFormat('YmdHi', get_the_date('YmdHi', $first_post->ID));
								echo $datetime->format('d') . ' ' . $datetime->format('M') . ', ' . $datetime->format('Y');
							 ?>
						</li>
						<li>
							<span class="title">Tags: </span>
							<?php
								$tags = get_the_tags( $first_post->ID );
								if($tags){
									foreach ($tags as $key => $tag) {
										if($key != 0){
											echo ', ';
										}
										echo $tag->name;
									}
								}
							 ?>
						</li>
					</ul>
				</div>

		    <?php endif; ?>
		    <?php wp_reset_postdata(); ?>
		    <?php
	    die(ob_get_clean());
	}else{
		die('');
	}
}